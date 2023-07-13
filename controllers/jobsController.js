import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";



  //************************************ CREATE-JOB-START *************************************
const createJob = async (req, res) => {
  console.log("CREATE JOB ROUTE");
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//************************************ CREATE-JOB-END *************************************


//************************************ GET-ALL-JOBS-START *************************************
const getAllJobs = async (req, res) => {
  // res.send("get all jobs");
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

//************************************ GET-ALL-JOBS-END *************************************



const updateJob = async (req, res) => {
  res.send("update Job");
};
const deleteJob = async (req, res) => {
  res.send("delete Job");
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, updateJob, deleteJob, getAllJobs, showStats };
