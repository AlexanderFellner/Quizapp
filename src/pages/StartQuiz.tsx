import React, { Fragment } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { logout } from "../firebase/Authentication";
import { useHistory } from "react-router";

const StartQuiz: React.FC = () => {
  const history = useHistory();
  const Logout = () => {
    logout();
    history.push("/login");
  };
  return (
    <Fragment>
      <IonToolbar color="primary">
        <IonButtons slot="primary">
          {" "}
          <IonButton onClick={Logout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Start Quiz</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonRow class="ion-justify-content-center">
                Willkommen zum Quiz
              </IonRow>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  Auf die Startschaltfläche einfach klicken und es geht los.Du
                  kommst dann zu einer Seite, auf der du eine Kategorie wählen
                  kannst.Klickst du dann auf diese Kategorie, kommst du zu einer
                  Seite, auf der du die Unterkategorie auswählen kannst.
                  Draufklicken und dann bist du schon bei der ersten Frage.Im
                  ersten Kästchen steht die Frage, in den vier darunterliegenden
                  Kästchen steht eine Antwortmöglichkeit.Wählst du das richtige
                  Kästchen(Antwort) aus, wird diese blau eingefärbt, ist die
                  Antwort falsch, wird das Kästchen blau eingefärbt.Für jede
                  richtige Antwort bekommst du einen Punkt.Dein Punktestand wird
                  oben rechts angezeigt.
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    routerLink="/quizlist"
                    color="primary"
                    class="ion-text-center"
                  >
                    Start
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </Fragment>
  );
};
export default StartQuiz;
