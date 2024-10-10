import { useQuery } from '@tanstack/react-query';

const fetchCourses = async () => {
  const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });
};