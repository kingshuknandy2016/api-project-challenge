import { ActianCareerService } from "../service/ActianCareersService";
import { Request, Response } from "express";

export class ActianCareersController {
  private actianCareerService: ActianCareerService;
  private actionCareersUrl: string;
  constructor() {
    this.actianCareerService = new ActianCareerService();
    this.actionCareersUrl = "https://www.actian.com/company/careers/";
  }

  getActionCareersHealthCheck(req: Request, res: Response) {
    res.status(200).json({ message: "service is healthy" });
  }
  async getOpenPositions(req: Request, res: Response) {
    try {
      const { department } = req.query;

      if (!department) {
        // If request param department is not supplied
        res.status(400).json({ error: "Department is required!" });
      } else {
        const result = await this.actianCareerService.getOpenPositions(
          this.actionCareersUrl
        );
        //console.log(`${JSON.stringify(result, null, 2)}`);
        const specificDepartment = result.find((element) => {
          return element.department === department;
        });

        //If no departments found with the given department name
        if (!specificDepartment) {
          res.status(200).json({ message: "No department found!" });
        } else {
          //After we find department return the open positions
          const openPositions = specificDepartment?.jobOpening.map(
            (opening) => opening.jobName
          );
          res.status(200).json({
            message: `Successfully retrieved the open positions for the department '${department}'`,
            data: {
              "no-of-open-positions": openPositions?.length,
              "open-positions": openPositions,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
