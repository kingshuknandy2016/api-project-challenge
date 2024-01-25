import express from "express";
import cheerio, { load } from "cheerio";
import { App } from "./app";

const port = process.env.PORT || 3000;

const microservice = new App(port);
microservice.configureApplication();
