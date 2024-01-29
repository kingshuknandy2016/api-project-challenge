import { json } from "stream/consumers";
import { ActianCareersController } from "../../src/controllers/ActianCareersController";
import { ActianCareerService } from "../../src/service/ActianCareersService";
import { Request, Response } from "express";

jest.mock("../../src/service/ActianCareersService");
describe("Open Positions of Action Careers", () => {
  let controller: ActianCareersController;
  let actionCareersServiceMock: jest.Mocked<ActianCareerService>;

  beforeEach(() => {
    actionCareersServiceMock = {
      getOpenPositions: jest.fn(),
    } as any as jest.Mocked<ActianCareerService>;
    controller = new ActianCareersController();
  });

  it("should return data", async () => {
    actionCareersServiceMock.getOpenPositions.mockResolvedValueOnce([
      {
        department: "Engineering",
        numberOfPositions: "2",
        jobOpening: [
          {
            jobName: "C Engineer - Bangalore/Pune",
            jobPosition: "Bangalore, India",
          },
          {
            jobName: "C++ Engineer - Pune",
            jobPosition: "Pune, India",
          },
        ],
      },
    ]);

    // ParamDic
    let req = { params: { department: "Engineering" } } as any as Request;
    //req.query.department = "Engineering";
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValueOnce({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    const result = await controller.getOpenPositions(req, res);
    console.log(result);
  });
});
