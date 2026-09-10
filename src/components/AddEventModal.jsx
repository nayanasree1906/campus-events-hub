import React, { useState, useEffect } from 'react';
import { CloseIcon, PlusIcon } from './Icons';
import { CATEGORIES } from '../data/sampleEvents';

export function AddEventModal({ isOpen, onClose, onAddEvent }) {
  // Exclude 'All' from creation categories
  const selectableCategories = CATEGORIES.filter(c => c !== 'All');

  const initialForm = {
    name: '',
    description: '',
    eventType: 'My College',
    category: 'Technical',
    date: '',
    time: '',
    venue: '',
    college: '',
    registrationDeadline: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Event name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.college.trim()) newErrors.college = 'College or organizer name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newEvent = {
      id: `evt-${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      eventType: formData.eventType,
      category: formData.category,
      date: formData.date,
      time: formData.time.trim(),
      venue: formData.venue.trim(),
      college: formData.college.trim(),
      registrationDeadline: formData.registrationDeadline || ''
    };

    onAddEvent(newEvent);
    setFormData(initialForm);
    setErrors({});
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-modal-title">
      <div className="modal-container add-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 id="add-modal-title" className="modal-event-title">Add New Event</h2>
            <p className="modal-subheading">Publish an event to Campus Events Hub</p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
          {/* Event Name */}
          <div className="form-group full-width">
            <label htmlFor="event-name" className="form-label">
              Event Name <span className="required-star">*</span>
            </label>
            <input
              id="event-name"
              type="text"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. CodeSprint 2026 Hackathon"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Event Type */}
          <div className="form-group">
            <label className="form-label">
              Event Type <span className="required-star">*</span>
            </label>
            <div className="radio-pill-group">
              <label className={`radio-pill ${formData.eventType === 'My College' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="eventType"
                  value="My College"
                  checked={formData.eventType === 'My College'}
                  onChange={handleChange}
                />
                My College
              </label>

              <label className={`radio-pill ${formData.eventType === 'Inter-College' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="eventType"
                  value="Inter-College"
                  checked={formData.eventType === 'Inter-College'}
                  onChange={handleChange}
                />
                Inter-College
              </label>
            </div>
            {errors.eventType && <span className="error-message">{errors.eventType}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required-star">*</span>
            </label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'input-error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              {selectableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          {/* College / Organizer */}
          <div className="form-group full-width">
            <label htmlFor="college" className="form-label">
              College / Organizer <span className="required-star">*</span>
            </label>
            <input
              id="college"
              type="text"
              name="college"
              className={`form-input ${errors.college ? 'input-error' : ''}`}
              placeholder="e.g. Apex Institute of Technology or Dramatics Club"
              value={formData.college}
              onChange={handleChange}
            />
            {errors.college && <span className="error-message">{errors.college}</span>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Event Date <span className="required-star">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          {/* Time */}
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Event Time <span className="required-star">*</span>
            </label>
            <input
              id="time"
              type="text"
              name="time"
              className={`form-input ${errors.time ? 'input-error' : ''}`}
              placeholder="e.g. 10:00 AM - 04:00 PM"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>

          {/* Venue */}
          <div className="form-group">
            <label htmlFor="venue" className="form-label">
              Venue <span className="required-star">*</span>
            </label>
            <input
              id="venue"
              type="text"
              name="venue"
              className={`form-input ${errors.venue ? 'input-error' : ''}`}
              placeholder="e.g. Main Auditorium, Block A"
              value={formData.venue}
              onChange={handleChange}
            />
            {errors.venue && <span className="error-message">{errors.venue}</span>}
          </div>

          {/* Registration Deadline */}
          <div className="form-group">
            <label htmlFor="registrationDeadline" className="form-label">
              Registration Deadline (Optional)
            </label>
            <input
              id="registrationDeadline"
              type="date"
              name="registrationDeadline"
              className="form-input"
              value={formData.registrationDeadline}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Event Description <span className="required-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Provide event overview, schedule details, eligibility, or prizes..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Form Actions */}
          <div className="modal-footer full-width">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <PlusIcon className="w-4 h-4 mr-1.5" />
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
