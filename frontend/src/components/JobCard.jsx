import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const JobCard = ({ job, isSaved, onToggleSave }) => {
    const navigate = useNavigate();
    console.log(job)
 const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Posted Time and Bookmark */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
          <button
            onClick={() => onToggleSave(job.id)}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? 'fill-purple-600 text-purple-600' : ''}`}
            />
          </button>
        </div>

        {/* Company Info */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12  rounded-lg flex items-center justify-center flex-shrink-0">
           <img 
  src={job.companyId?.logo} 
  alt="Job Icon" 
  className="w-12 h-12 text-blue-500"
/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{job.company}</h3>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </div>

        {/* Job Title */}
        <h4 className="font-semibold text-lg mb-2">{job.title}</h4>
        
        {/* Job Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Job Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-blue-600 font-medium"> Positions</span>
          <span className="text-sm  text-red-600 font-medium">{job?.position}</span>
          <span className='  border-2 rounded-2xl px-2'  ><p className="text-sm   text-gray-700 font-medium">{job?.salary}LPA</p></span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button onClick={()=> navigate(`/jobs/description/${job._id}`)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-medium">
            Details
          </button>
          <button  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Save For Later
          </button>
        </div>
      </div>
    </div>
  );
};
export default JobCard;