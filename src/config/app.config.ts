/* eslint-disable prettier/prettier */

// here we can define the all  environment  variables
export const EnvConfig = () =>({
  envirioment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  default_limit: process.env.DEFAULT_LIMIT || 5,
});
