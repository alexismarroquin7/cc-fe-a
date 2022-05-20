import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({width}) => width ? width : 'auto'};
  border: ${({border, variant}) => {
    let borderToUse = '0';

    if(border){
      borderToUse = border;
    } else if(variant === 'text') {
      borderToUse = '0';
    } else if(variant === 'contained') {
      borderToUse = '.2rem solid #4285F4';
    } else if(variant === 'outlined') {
      borderToUse = '.2rem solid #4285F4';
    }

    return borderToUse;
  }};
  border-radius: ${({borderRadius, variant}) => {
    let borderRadiusToUse = '0';
    
    if(borderRadius){
      borderRadiusToUse = borderRadius;
    } else if(variant === 'text'){
      borderRadiusToUse = '15px';
    } else if(variant === 'contained'){
      borderRadiusToUse = '15px';
    } else if(variant === 'outlined'){
      borderRadiusToUse = '15px';
      
    }
    return borderRadiusToUse;
  }};
  background-color: ${({bgColor, variant}) => {
    let bgColorToUse = 'auto';
    
    if(bgColor){
      bgColorToUse = bgColor;
    } else if(variant === 'text'){
      bgColorToUse = 'rgb(0,0,0,0)';
    } else if(variant === 'contained'){
      bgColorToUse = '#4285F4';
    } else if(variant === 'outlined'){
      bgColorToUse = 'rgb(0,0,0,0)';
    }

    return bgColorToUse;
  }};
  color: ${({color, variant}) => {
    let colorToUse = 'auto';
    
    if(color){
      colorToUse = color;
    } else if(variant === 'text'){
      colorToUse = '#4285F4';
    } else if(variant === 'contained'){
      colorToUse = 'white';
    } else if(variant === 'outlined'){
      colorToUse = '#4285F4';
    }

    return colorToUse;
  }};
  font-size: ${({fontSize}) => fontSize ? fontSize : ""};
  padding: ${({padding}) => padding ? padding : ".25rem .75rem"};

`

export const Button = (props) => {
  return (
    <StyledButton
      {...props}
    >{props.children}</StyledButton>
  )
}