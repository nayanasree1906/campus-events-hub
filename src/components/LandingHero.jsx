import React from 'react';
import { CollegeIcon, GlobeIcon, SparklesIcon } from './Icons';

export function LandingHero({ activeTab, onSelectTab, myCollegeCount, interCollegeCount }) {
  return (
    <section className="landing-hero">
      <div className="hero-header">
        <div className="hero-tag">
          <SparklesIcon className="w-4 h-4 text-indigo-500" />
          <span>Student Event Discovery Platform</span>
        </div>
        <h1 className="hero-title">Campus Events Hub</h1>
        <p className="hero-description">
          Discover, participate in, and keep track of campus happenings. Browse exciting events 
          happening right inside our college as well as inter-college competitions and festivals across campuses.
        </p>
      </div>

      <div className="choice-container">
        {/* Choice 1: MY COLLEGE */}
        <button
          type="button"
          className={`choice-card choice-my-college ${activeTab === 'my_college' ? 'selected' : ''}`}
          onClick={() => onSelectTab('my_college')}
          aria-pressed={activeTab === 'my_college'}
        >
          <div className="choice-badge">
            <span className="badge-dot dot-my-college"></span>
            <span>Inside Campus</span>
          </div>

          <div className="choice-icon-wrap icon-my-college">
            <CollegeIcon className="w-8 h-8" />
          </div>

          <div className="choice-content">
            <h2 className="choice-heading">MY COLLEGE</h2>
            <p className="choice-text">
              Browse events happening inside our own college campus. Discover club activities, departmental workshops, campus sports meets, and cultural nights.
            </p>
          </div>

          <div className="choice-footer">
            <span className="choice-count">{myCollegeCount} Events available</span>
            <span className="choice-action">
              {activeTab === 'my_college' ? 'Currently viewing ✓' : 'Browse My College →'}
            </span>
          </div>
        </button>

        {/* Choice 2: INTER-COLLEGE */}
        <button
          type="button"
          className={`choice-card choice-inter-college ${activeTab === 'inter_college' ? 'selected' : ''}`}
          onClick={() => onSelectTab('inter_college')}
          aria-pressed={activeTab === 'inter_college'}
        >
          <div className="choice-badge">
            <span className="badge-dot dot-inter-college"></span>
            <span>Across Campuses</span>
          </div>

          <div className="choice-icon-wrap icon-inter-college">
            <GlobeIcon className="w-8 h-8" />
          </div>

          <div className="choice-content">
            <h2 className="choice-heading">INTER-COLLEGE</h2>
            <p className="choice-text">
              Discover events happening at other colleges open for our students. Participate in national hackathons, inter-collegiate fests, and competitive championships.
            </p>
          </div>

          <div className="choice-footer">
            <span className="choice-count">{interCollegeCount} Events available</span>
            <span className="choice-action">
              {activeTab === 'inter_college' ? 'Currently viewing ✓' : 'Browse Inter-College →'}
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
