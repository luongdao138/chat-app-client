import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.35);
`;

export const Content = styled.div`
   position: absolute;
   z-index: 2000;
   transform: translate(-50%, -50%);
   top: 50%;
   left: 50%;
   width: 600px;
   max-width: 95%;
   background: #120F13;
   border-radius: 24px;
   padding: 20px;

   .title {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: #e0e0e0;
    margin-bottom: 20px;
   }

   input, textarea {
      width: 100%;
      outline: none;
      border: none;
      background: #3C393F;
      border-radius: 8px;
      padding: 10px 10px 10px 14px;
      color: #e0e0e0;
      margin-bottom: 20px;
      resize: none;
   }

   textarea {
     height: 80px;
     margin-bottom: 10px;
   }

   button {
    background: #2F80ED;
border-radius: 8px;
padding: 8px 20px;
color: #e0e0e0;
   }

   @media (max-width: 650px) {
     padding: 20px 10px;
   }
`;