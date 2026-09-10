/**
 * Date and deadline utilities for Campus Events Hub
 */

export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  // Support YYYY-MM-DD without UTC timezone drift by treating as local
  const parts = String(dateStr).split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDeadlineInfo(deadlineStr) {
  if (!deadlineStr) return null;

  let targetDate;
  const parts = String(deadlineStr).split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    targetDate = new Date(year, month, day);
  } else {
    targetDate = new Date(deadlineStr);
  }

  if (isNaN(targetDate.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: 'closed',
      text: 'Registration closed',
      isUrgent: false,
      isClosed: true,
      formattedDate: formatDisplayDate(deadlineStr)
    };
  } else if (diffDays === 0) {
    return {
      status: 'today',
      text: 'Registration closes today!',
      isUrgent: true,
      isClosed: false,
      formattedDate: formatDisplayDate(deadlineStr)
    };
  } else if (diffDays === 1) {
    return {
      status: 'urgent',
      text: 'Registration closes in 1 day',
      isUrgent: true,
      isClosed: false,
      formattedDate: formatDisplayDate(deadlineStr)
    };
  } else if (diffDays <= 3) {
    return {
      status: 'urgent',
      text: `Registration closes in ${diffDays} days`,
      isUrgent: true,
      isClosed: false,
      formattedDate: formatDisplayDate(deadlineStr)
    };
  } else {
    return {
      status: 'open',
      text: `Registration deadline: ${formatDisplayDate(deadlineStr)}`,
      isUrgent: false,
      isClosed: false,
      formattedDate: formatDisplayDate(deadlineStr)
    };
  }
}
