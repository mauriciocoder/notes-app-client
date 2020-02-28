// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aws: {
    s3: {
      REGION: "us-east-1",
      BUCKET: "codecraft-notes-app-uploads"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://voebnqkrg4.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_u3ISvifSx",
      APP_CLIENT_ID: "1sfmgb9ik64cauksudvt4kpejm",
      IDENTITY_POOL_ID: "us-east-1:04d90b32-89de-47ed-bbf7-a89fc6cba9d9"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
