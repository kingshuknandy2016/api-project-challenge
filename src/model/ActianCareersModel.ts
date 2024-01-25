export interface JobOpening {
  jobName: string;
  jobPosition: string;
}

export interface OpenPositionData {
  department: string;
  numberOfPositions: string;
  jobOpening: JobOpening[];
}
