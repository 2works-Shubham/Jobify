const createJob = async (req, res) => {
  res.send("Create Job ");
};
const updateJob = async (req, res) => {
  res.send("update Job ");
};
const deleteJob = async (req, res) => {
  res.send("delete Job");
};
const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, updateJob, deleteJob, getAllJobs, showStats };
