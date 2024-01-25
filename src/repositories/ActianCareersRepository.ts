export class ActianCareersRepository {
  async fetchData(url: string): Promise<string> {
    const response: Response = await fetch(url);
    const htmlContent = await response.text();
    return htmlContent;
  }
}
