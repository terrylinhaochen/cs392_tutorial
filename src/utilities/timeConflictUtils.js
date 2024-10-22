const parseMeetingString = (meetingString) => {
    const days = meetingString.match(/[MTWTFSS]+/g) || [];
    const timeRange = meetingString.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
    const startTime = timeRange ? timeRange[1] : null;
    const endTime = timeRange ? timeRange[2] : null;
    return { days, startTime, endTime };
  };
  
  const hasTimeOverlap = (time1, time2) => {
    if (!time1 || !time2) return false;
    const [start1, end1] = time1.split('-').map(t => new Date(`1970-01-01T${t}:00`));
    const [start2, end2] = time2.split('-').map(t => new Date(`1970-01-01T${t}:00`));
    return start1 < end2 && start2 < end1;
  };
  
  const hasDayOverlap = (days1, days2) => {
    return days1.some(day => days2.includes(day));
  };
  
  export const hasConflict = (course1, course2) => {
    const { days: days1, startTime: start1, endTime: end1 } = parseMeetingString(course1.meets);
    const { days: days2, startTime: start2, endTime: end2 } = parseMeetingString(course2.meets);
    
    return hasDayOverlap(days1, days2) && hasTimeOverlap(`${start1}-${end1}`, `${start2}-${end2}`);
  };