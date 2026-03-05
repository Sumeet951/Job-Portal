import JobCard from "./JobCard";

 const JobListings = ({ jobs, savedJobs, onToggleSave }) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
};
export default JobListings;
