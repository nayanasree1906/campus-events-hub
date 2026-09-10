import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { AddEventModal } from './components/AddEventModal';
import { SearchIcon, HeartIcon, PlusIcon } from './components/Icons';
import { INITIAL_EVENTS } from './data/sampleEvents';
import './App.css';

const STORAGE_EVENTS_KEY = 'campus_events_hub_events';
const STORAGE_INTERESTED_KEY = 'campus_events_hub_interested';

export default function App() {
  // 1. Events State with LocalStorage Initialization
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EVENTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read events from localStorage:', err);
    }
    return INITIAL_EVENTS;
  });

  // 2. Interested Events State with LocalStorage Initialization
  const [interestedIds, setInterestedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_INTERESTED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read interested from localStorage:', err);
    }
    return [];
  });

  // 3. UI and Filter State
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'my_college' | 'inter_college' | 'interested'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const browseSectionRef = useRef(null);

  // Sync events to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(events));
    } catch (err) {
      console.error('Failed to persist events to localStorage:', err);
    }
  }, [events]);

  // Sync interestedIds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_INTERESTED_KEY, JSON.stringify(interestedIds));
    } catch (err) {
      console.error('Failed to persist interestedIds to localStorage:', err);
    }
  }, [interestedIds]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Handle My College / Inter-College selection with smooth scroll to browsing section
  function handleSelectTab(tabKey) {
    setActiveTab(tabKey);
    if (browseSectionRef.current) {
      browseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Toggle Interested handler
  function handleToggleInterested(eventId) {
    setInterestedIds((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  }

  // Add new event handler
  function handleAddEvent(newEvent) {
    setEvents((prev) => [newEvent, ...prev]);
    // Automatically make sure view matches the event or 'all'
    if (newEvent.eventType === 'My College' && activeTab === 'inter_college') {
      setActiveTab('my_college');
    } else if (newEvent.eventType === 'Inter-College' && activeTab === 'my_college') {
      setActiveTab('inter_college');
    }
    // Reset category if filtered to something else so new event is immediately visible
    if (selectedCategory !== 'All' && selectedCategory !== newEvent.category) {
      setSelectedCategory('All');
    }
    setSearchQuery('');
    setToastMessage(`"${newEvent.name}" added successfully!`);

    if (browseSectionRef.current) {
      browseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Reset search and category filters
  function handleResetFilters() {
    setSearchQuery('');
    setSelectedCategory('All');
  }

  // Counts for My College and Inter-College badges
  const myCollegeCount = useMemo(
    () => events.filter((e) => e.eventType === 'My College').length,
    [events]
  );
  const interCollegeCount = useMemo(
    () => events.filter((e) => e.eventType === 'Inter-College').length,
    [events]
  );

  // Filtered Events Calculation
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Tab / Type filter
      if (activeTab === 'my_college' && event.eventType !== 'My College') {
        return false;
      }
      if (activeTab === 'inter_college' && event.eventType !== 'Inter-College') {
        return false;
      }
      if (activeTab === 'interested' && !interestedIds.includes(event.id)) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Search query match (name, college, venue, category)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = event.name.toLowerCase().includes(q);
        const matchesCollege = event.college.toLowerCase().includes(q);
        const matchesVenue = event.venue.toLowerCase().includes(q);
        const matchesCategory = event.category.toLowerCase().includes(q);

        if (!matchesName && !matchesCollege && !matchesVenue && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [events, activeTab, interestedIds, selectedCategory, searchQuery]);

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        interestedCount={interestedIds.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Hero with Two Primary Choices */}
      <LandingHero
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        myCollegeCount={myCollegeCount}
        interCollegeCount={interCollegeCount}
      />

      {/* Main Browse Section */}
      <main className="main-content" ref={browseSectionRef}>
        <div className="content-container">
          {/* Section Heading & Active Tab Indicator */}
          <div className="section-header">
            <div>
              <div className="section-eyebrow">
                {activeTab === 'all' && 'All Campus Events'}
                {activeTab === 'my_college' && 'Events at Our College'}
                {activeTab === 'inter_college' && 'Inter-College Competitions & Fests'}
                {activeTab === 'interested' && 'My Saved & Interested Events'}
              </div>
              <h2 className="section-title">
                {activeTab === 'all' && 'Explore All Campus Events'}
                {activeTab === 'my_college' && 'My College Events'}
                {activeTab === 'inter_college' && 'Inter-College Events'}
                {activeTab === 'interested' && 'Interested Events'}
              </h2>
            </div>

            {activeTab !== 'all' && (
              <button
                type="button"
                className="view-all-link"
                onClick={() => setActiveTab('all')}
              >
                View all categories & events →
              </button>
            )}
          </div>

          {/* Search and Category Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            totalResults={filteredEvents.length}
            onResetFilters={handleResetFilters}
          />

          {/* Events Grid or Empty State */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isInterested={interestedIds.includes(event.id)}
                  onToggleInterested={handleToggleInterested}
                  onSelectEvent={setSelectedEvent}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              {activeTab === 'interested' && interestedIds.length === 0 ? (
                <>
                  <div className="empty-icon-wrap">
                    <HeartIcon className="w-10 h-10 text-rose-400" />
                  </div>
                  <h3 className="empty-title">No interested events yet</h3>
                  <p className="empty-description">
                    When browsing events, click the <strong>"Interested"</strong> heart button to save events you want to track or attend.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setActiveTab('all')}
                  >
                    Browse All Events
                  </button>
                </>
              ) : (
                <>
                  <div className="empty-icon-wrap">
                    <SearchIcon className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="empty-title">No events found</h3>
                  <p className="empty-description">
                    No events found. Try another search or category.
                  </p>
                  <div className="empty-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleResetFilters}
                    >
                      Clear Filters & Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <PlusIcon className="w-4 h-4 mr-1.5" />
                      Add This Event
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-brand">Campus Events Hub</p>
          <p className="footer-desc">
            Discover internal campus activities and inter-college invitations across institutions.
          </p>
        </div>
      </footer>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isInterested={interestedIds.includes(selectedEvent.id)}
          onToggleInterested={handleToggleInterested}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
