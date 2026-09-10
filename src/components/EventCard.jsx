import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, BuildingIcon, HeartIcon, AlertCircleIcon } from './Icons';
import { formatDisplayDate, getDeadlineInfo } from '../utils/dateUtils';

export function EventCard({ event, isInterested, onToggleInterested, onSelectEvent }) {
  const deadlineInfo = getDeadlineInfo(event.registrationDeadline);
  const isMyCollege = event.eventType === 'My College';

  return (
    <article className="event-card">
      <div className="card-top-bar">
        <div className="card-badges">
          <span className={`type-tag ${isMyCollege ? 'type-my-college' : 'type-inter-college'}`}>
            {event.eventType}
          </span>
          <span className="category-tag">{event.category}</span>
        </div>

        <button
          type="button"
          className={`interested-btn ${isInterested ? 'is-interested' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleInterested(event.id);
          }}
          title={isInterested ? 'Remove from Interested' : 'Mark as Interested'}
          aria-label={isInterested ? 'Remove from Interested' : 'Mark as Interested'}
          aria-pressed={isInterested}
        >
          <HeartIcon className="w-5 h-5" filled={isInterested} />
          <span className="interested-btn-label">
            {isInterested ? 'Interested' : 'Interested?'}
          </span>
        </button>
      </div>

      <div className="card-body" onClick={() => onSelectEvent(event)} role="button" tabIndex={0}>
        <h3 className="event-title">{event.name}</h3>

        <div className="event-college">
          <BuildingIcon className="w-4 h-4 college-icon" />
          <span className="college-name">{event.college}</span>
        </div>

        <div className="event-metadata">
          <div className="meta-item">
            <CalendarIcon className="w-4 h-4 meta-icon" />
            <span>{formatDisplayDate(event.date)}</span>
          </div>

          <div className="meta-item">
            <ClockIcon className="w-4 h-4 meta-icon" />
            <span>{event.time}</span>
          </div>

          <div className="meta-item">
            <MapPinIcon className="w-4 h-4 meta-icon" />
            <span className="venue-text">{event.venue}</span>
          </div>
        </div>

        {/* Prominent Registration Deadline */}
        {deadlineInfo && (
          <div className={`deadline-banner ${deadlineInfo.isUrgent ? 'deadline-urgent' : 'deadline-normal'} ${deadlineInfo.isClosed ? 'deadline-closed' : ''}`}>
            <AlertCircleIcon className="w-4 h-4 deadline-icon" />
            <span className="deadline-text">{deadlineInfo.text}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          type="button"
          className="btn btn-outline view-details-btn"
          onClick={() => onSelectEvent(event)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
