import EXPRESS from 'express';

export const express = EXPRESS;

export const app:EXPRESS.Application = express();


//
export type req_T_ = EXPRESS.Request;
export type res_T_ = EXPRESS.Response;
export type nextFunc_T_ = EXPRESS.NextFunction;

export type router_T_ = EXPRESS.Router;
///

