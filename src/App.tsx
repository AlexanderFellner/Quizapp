import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Welcome from "./pages/Welcome";
import Authentication from "./pages/Authentication";
import Quizlist from "./pages/Quizlist";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import AddQuestion from "./pages/AddQuestion";
import StartQuiz from "./pages/StartQuiz";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route
            path="/login"
            render={() => <Authentication register="No" title="Login" />}
          />
          <Route
            path="/register"
            render={() => <Authentication register="Yes" title="Register" />}
          />
          <Route path="/quizlist" render={() => <Quizlist />} />
          <Route
            path="/category/:category/subcategory/:subcategory"
            component={Subcategory}
          />
          <Route path="/category/:category/" component={Category} />
          <Route path="/addquestion" component={AddQuestion} />
          <Route path="/startquiz" component={StartQuiz} />

          {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
