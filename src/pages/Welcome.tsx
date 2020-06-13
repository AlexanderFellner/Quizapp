import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";

const Welcome: React.FC = () => {
  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle></IonTitle>
          <IonButtons slot="primary">
            <IonButton routerLink="/login"> Login</IonButton>
            <IonButton routerLink="/register">Register</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow class="ion-text-center ion-margin-top">
            <IonCol>
              <div>Welcome to the Quiz.Please signin or register</div>
            </IonCol>
          </IonRow>
        </IonGrid>{" "}
      </IonContent>
    </React.Fragment>
  );
};
export default Welcome;
