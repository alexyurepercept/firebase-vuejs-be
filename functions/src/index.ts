import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes";

admin.initializeApp();

// initialize express endpoints
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

routes(app);
export const api = functions.https.onRequest(app);

// by default, all user is basic user
const db = admin.firestore();
export const AddUserRole = functions.auth.user().onCreate(async authUser => {
  console.log("adding user role");
  console.log(authUser);
  const customClaims = {
    basic: true
  };
  try {
    await admin.auth().setCustomUserClaims(authUser.uid, customClaims);
    return db
      .collection("roles")
      .doc(authUser.uid)
      .set({
        email: authUser.email,
        role: customClaims
      });
  } catch (error) {
    console.log(error);
  }
  return null;
});

export const setUserRole = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().setCustomUserClaims(data.uid, data.role);
    return db
      .collection("roles")
      .doc(data.uid)
      .update({
        role: data.role
      });
  } catch (error) {
    console.log(error);
  }
  return null;
});
