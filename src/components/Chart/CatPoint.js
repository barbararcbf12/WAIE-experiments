import React, { Component } from 'react';
import { Image, G, Circle, Line, Rect, Text } from "react-native-svg";

class CatPoint extends Component {

    render() {
      const {x, y, datum, events} = this.props;
      const placeBox = (
            <Image
                x={x - 5}
                y={y + 13}
                width="60"
                height="60"
                preserveAspectRatio="xMidYMid slice"
                opacity="1"
                href={ this.props.image }
                stroke="grey"
                strokeWidth="2.5"
            />
      );
        
      let label = "";
      let bgColor = "#fff";
      
      if(this.props.name == "Bowel Urgency"){
        label = "Bowel urgency";
        bgColor = "#ffb300";
      }
      if(this.props.name == "Bloating"){
        label = "Bloating";
        bgColor = "#99af72";
      }
      if(this.props.name == "Constipation"){
        label = "Constipation";
        bgColor = "#00ffff";
      }
      if(this.props.name == "Craving"){
        label = "Craving";
        bgColor = "#ff00ff";
      }
      if(this.props.name == "Diarrhea"){
        label = "Diarrhea";
        bgColor = "#ffff00";
      }
      if(this.props.name == "Bowel Moviments"){
        label = "Bowel mov";
        bgColor = "#07a8a8";
      }
      if(this.props.name == "Heartburn"){
        label = "Heartburn";
        bgColor = "#00ff00";
      }
      if(this.props.name == "Nausea / Vomit"){
        label = "Nausea/Vomit";
        bgColor = "#bb8296";
      }
      if(this.props.name == "Other"){
        label = "Other";
        bgColor = "#4f8eef";
      }

      // let symptomRec = ();

      let symptomBox = (
        <G>
          <Rect
              x={x - 5}
              y={y + 13}
              width="60"
              height="60"
              fill= {bgColor} 
              strokeWidth="2.5"
              stroke="grey"
          />
          <Text
              x={x + 25}
              y={y + 47}
              textAnchor="middle"
              fontWeight="normal"
              fontSize="10"
              fill="#000"
          >
            {label}
          </Text>
        </G>
      );

      return (
        <G {...events}>

            <Line
                x1={x}
                y1={y}
                x2={x}
                y2={y + 13}
                stroke="gray"
                strokeWidth="2"
            />
            <Circle
                cx={x}
                cy={y+3}
                r="5"
                fill="black"
            />
            <Rect
                x={x - 5}
                y={y + 13}
                width="60"
                height="60"
                fill= "rgb(255,255,255)"
                strokeWidth="3"
                stroke="grey"
            />
            
            {this.props.type === "place" ? placeBox : symptomBox}

        </G>
      );
    }
  }

  export default CatPoint;
