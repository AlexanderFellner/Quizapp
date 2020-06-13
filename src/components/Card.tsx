import React from "react";
import { IonButton } from "@ionic/react";
import { Link } from "react-router-dom";

const Card: React.FC<{
  color: string;
  backgroundColor: string;
  category?: string;
  subcategory?: string;
  checkAnswer?: Function;
  submittedAnswer?: string;
  correctAnswer?: string;
  correctAnswerNumber?: number;
  cardClicked?: boolean;
  slidenumber?: number;
  cardnumber?: number;
}> = (props) => {
  return (
    <div
      className="ion-text-sm-center"
      style={{
        marginTop: 20,
        marginLeft: "12.5%",
        width: "75%",
        height: 112,
        color: props.color,
        backgroundColor: props.backgroundColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      {/* <IonButton
        onClick={() => props.questions(props.item)}
        color={props.backgroundColor}
        style={{ paddingTop: 0, margin: 0, height: "100%", width: "100%" }}
      >
        {" "}
        {props.children}{" "}
      </IonButton> */}
      <div
        style={{
          backgroundColor: props.backgroundColor,
          //paddingTop: 100,
          height: "100%",
          width: "100%",
          borderColor: props.backgroundColor,
          borderWidth: 2,
          borderRadius: 3,

          textAlign: "center",
        }}
      >
        {props.category && props.subcategory ? (
          <Link
            to={`/category/${props.category}/subcategory/${props.subcategory}`}
            style={{
              color: props.color,
              textDecoration: "none",
            }}
          >
            {props.children}
          </Link>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              color: props.color,
              backgroundColor: props.backgroundColor,
              borderWidth: 2,
              borderRadius: 3,
            }}
          >
            <IonButton
              color={props.backgroundColor}
              style={{
                height: "100%",
                width: "100%",
                margin: 0,
              }}
              onClick={() => {
                props.checkAnswer?.(
                  props.submittedAnswer,
                  props.correctAnswer,
                  props.correctAnswerNumber,
                  props.cardClicked,
                  props.slidenumber,
                  props.cardnumber
                );
              }}
            >
              {props.children}
            </IonButton>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
