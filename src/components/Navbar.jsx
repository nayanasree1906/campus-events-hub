import React from 'react';
import { SparklesIcon, HeartIcon, PlusIcon, CollegeIcon, GlobeIcon } from './Icons';

export function Navbar({ activeTab, setActiveTab, interestedCount, onOpenAddModal }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => setActiveTab('all')} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Campus Events Hub</span>
            <span className="brand-subtitle">Discover • Connect • Participate</span>
          </div>
        </div>

        <nav className="navbar-tabs" aria-label="Event Type Navigation">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Events
          </button>
          
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'my_college' ? 'active' : ''}`}
            onClick={() => setActiveTab('my_college')}
          >
            <CollegeIcon className="w-4 h-4 mr-1.5" />
            My College
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'inter_college' ? 'active' : ''}`}
            onClick={() => setActiveTab('inter_college')}
          >
            <GlobeIcon className="w-4 h-4 mr-1.5" />
            Inter-College
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'interested' ? 'active' : ''}`}
            onClick={() => setActiveTab('interested')}
          >
            <HeartIcon className="w-4 h-4 mr-1.5" filled={interestedCount > 0} />
            Interested
            {interestedCount > 0 && (
              <span className="interested-badge">{interestedCount}</span>
            )}
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-primary add-event-btn"
            onClick={onOpenAddModal}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            <span>Add Event</span>
          </button>
        </div>
      </div>
    </header>
  );
}
