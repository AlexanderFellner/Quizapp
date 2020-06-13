import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButtons,
  IonButton,
  useIonViewDidEnter,
  IonIcon,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import {
  login,
  logout,
  register,
  userStateChanged,
} from "../firebase/Authentication";
const Authentication: React.FC<{ title: string; register: "Yes" | "No" }> = (
  props
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // console.log("useEffect in auth");
    userStateChanged();
  });

  // why not activated
  useIonViewDidEnter(() => {
    console.log("ionview did enter fired");
  });
  const history = useHistory();
  const Logout = () => {
    logout();
  };

  const submit = (event: any) => {
    event.preventDefault();

    if (props.register === "No") {
      login(email, password)
        .then((usercred) => {
          if (usercred.user != null) {
            history.push("/startquiz");
          }
          console.log(usercred);
          return usercred;
        })
        .catch((error) => console.log(error));
    }
    if (props.register === "Yes") {
      console.log(email);
      console.log(password);
      register(email, password);
    }
  };
  return (
    <React.Fragment>
      <IonToolbar color="primary">
        <IonTitle class="ion-text-center">{props.title}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/"></IonBackButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton onClick={Logout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <form onSubmit={submit}>
          <IonCard>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput
                        required
                        type="text"
                        value={email}
                        onIonChange={(e: any) => {
                          setEmail(e.target.value);
                        }}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        required
                        type="password"
                        value={password}
                        onIonChange={(e: any) => {
                          setPassword(e.target.value);
                        }}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                {props.register === "Yes" && (
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Confirm password
                        </IonLabel>
                        <IonInput required type="password"></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                )}
                <IonRow>
                  <IonCol>
                    <IonButtons class="ion-padding">
                      <IonButton color="danger" fill="outline">
                        Cancel
                      </IonButton>
                      <IonButton fill="solid" type="submit" color="primary">
                        Submit
                      </IonButton>
                    </IonButtons>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </form>
      </IonContent>
    </React.Fragment>
  );
};
export default Authentication;
