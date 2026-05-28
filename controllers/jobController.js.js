const Job = require('../models/jobModel');

// @desc    Get all jobs with multi-criteria dynamic filtering
// @route   GET /api/v1/jobs
const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  // 1. Dynamic Query Object Construction
  const queryObject = {};

  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  // 2. Execute Base Query
  let result = Job.find(queryObject);

  // 3. Multi-criteria Sorting Logic
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  } else if (sort === 'oldest') {
    result = result.sort('createdAt');
  } else if (sort === 'a-z') {
    result = result.sort('position');
  } else if (sort === 'z-a') {
    result = result.sort('-position');
  }

  // 4. Pagination (Optimization)
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  try {
    const jobs = await result;
    res.status(200).json({ jobs, count: jobs.length });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching dynamic queries', error: error.message });
  }
};

module.exports = { getAllJobs };