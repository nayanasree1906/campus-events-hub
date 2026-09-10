import React, { useEffect } from 'react';
import { CloseIcon, CalendarIcon, ClockIcon, MapPinIcon, BuildingIcon, HeartIcon, AlertCircleIcon } from './Icons';
import { formatDisplayDate, getDeadlineInfo } from '../utils/dateUtils';

export function EventDetailModal({ event, isInterested, onToggleInterested, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!event) return null;

  const deadlineInfo = getDeadlineInfo(event.registrationDeadline);
  const isMyCollege = event.eventType === 'My College';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-badges">
            <span className={`type-tag ${isMyCollege ? 'type-my-college' : 'type-inter-college'}`}>
              {event.eventType}
            </span>
            <span className="category-tag">{event.category}</span>
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

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-title" className="modal-event-title">{event.name}</h2>

          <div className="modal-organizer-box">
            <BuildingIcon className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="organizer-label">Organized by</span>
              <p className="organizer-name">{event.college}</p>
            </div>
          </div>

          {/* Registration Deadline Alert if applicable */}
          {deadlineInfo ? (
            <div className={`modal-deadline-box ${deadlineInfo.isUrgent ? 'urgent' : ''} ${deadlineInfo.isClosed ? 'closed' : ''}`}>
              <AlertCircleIcon className="w-5 h-5" />
              <div>
                <span className="deadline-box-title">Registration Deadline</span>
                <p className="deadline-box-text">{deadlineInfo.text}</p>
              </div>
            </div>
          ) : (
            <div className="modal-deadline-box open">
              <AlertCircleIcon className="w-5 h-5" />
              <div>
                <span className="deadline-box-title">Registration</span>
                <p className="deadline-box-text">Open / Spot Entries (No strict deadline)</p>
              </div>
            </div>
          )}

          {/* Key Event Logistics */}
          <div className="modal-logistics-grid">
            <div className="logistic-card">
              <CalendarIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <span className="logistic-label">Date</span>
                <span className="logistic-val">{formatDisplayDate(event.date)}</span>
              </div>
            </div>

            <div className="logistic-card">
              <ClockIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <span className="logistic-label">Time</span>
                <span className="logistic-val">{event.time}</span>
              </div>
            </div>

            <div className="logistic-card full-width">
              <MapPinIcon className="w-5 h-5 text-indigo-500" />
              <div>
                <span className="logistic-label">Venue</span>
                <span className="logistic-val">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Full Event Description */}
          <div className="modal-description-section">
            <h3 className="section-heading">About This Event</h3>
            <p className="description-content">{event.description}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className={`btn ${isInterested ? 'btn-danger' : 'btn-outline'} interested-toggle-action`}
            onClick={() => onToggleInterested(event.id)}
          >
            <HeartIcon className="w-5 h-5 mr-2" filled={isInterested} />
            {isInterested ? 'Remove from Interested' : 'Mark as Interested'}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
