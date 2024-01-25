import { load } from "cheerio";
import { ActianCareersRepository } from "../repositories/ActianCareersRepository";
import { JobOpening, OpenPositionData } from "../model/ActianCareersModel";

export class ActianCareerService {
  private actianCareersRepository: ActianCareersRepository;
  constructor() {
    this.actianCareersRepository = new ActianCareersRepository();
  }

  async getOpenPositions(url: string): Promise<OpenPositionData[]> {
    try {
      const htmlContent = await this.actianCareersRepository.fetchData(url);
      const $ = load(htmlContent);
      const jobPostingElement = $("div.job-posting");

      const jobPosting: OpenPositionData[] = [];
      jobPostingElement.each((i, jobHeadingElement) => {
        const department = $(jobHeadingElement).find(".department").text();
        const numberOfPositions = $(jobHeadingElement)
          .find(".number-of-positions")
          .text();

        const openPositionElement = $(jobHeadingElement).find(
          ".job-content > .listing"
        );

        const openPositionArray: JobOpening[] = [];
        openPositionElement.each((i, jobListingElement) => {
          const jobName = $(jobListingElement).find(".job-name").text();
          const jobPosition = $(jobListingElement).find(".job-position").text();
          openPositionArray.push({ jobName, jobPosition } as JobOpening);
        });

        jobPosting.push({
          department,
          numberOfPositions,
          jobOpening: openPositionArray,
        });
      });

      return jobPosting;
    } catch (error) {
      console.log(error);
      throw new Error("Error while scraping data");
    }
  }
}
