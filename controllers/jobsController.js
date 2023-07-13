import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createJob = async (req, res) => {
 
 console.log("CREATE JOB ROUTE");
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please Provide All Values")
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
  res.send("update Job");
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
