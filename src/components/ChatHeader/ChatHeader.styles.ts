import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const Left = styled.div`
     height: 100%;
     width: 320px;
     background-color: #120F13;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 20px;
     color: #E0E0E0;

     .title {
       font-weight: bold;
       font-size: 18px;
     }

     .add {
       width: 32px;
       height: 32px;
       background: #252329;
       display: flex;
       border-radius: 8px;
       cursor: pointer;

       svg {
         font-size: 20px;
         margin: auto;
       }

      }
      button {
        display: flex;
        align-items: center;
        color: #E0E0E0;
        background-color: transparent;
        svg {
         font-size: 32px;
         margin-right: 10px;
        }

        span {
         font-weight: bold;
         font-size: 18px;
        }
      }

      .close {
        display: none;
      }

      @media (max-width: 650px) {
        position: absolute;
        width: 270px;
        transition: all 0.25s ease-in-out;
        z-index: 100;
        transform-origin: 0 0;
        transform: ${({isShowLeft}: {isShowLeft: boolean}) => isShowLeft ? 'scaleX(1)': 'scaleX(0)'};


        .close {
          width: 32px;
       height: 32px;
       background: #120F13;
       display: flex;
       border-radius: 8px;
       cursor: pointer;
       position: absolute;
       right: -35px;

       svg {
         font-size: 20px;
         margin: auto;
       }

        }
      }
`;

export const Right = styled.div`
     height: 100%;
     background-color: #252329;
     flex-grow: 1;
     padding: 20px 40px;
     display: flex;
     align-items: center;
     color: #e0e0e0;

     svg {
       font-size: 24px;
       margin-right: 10px;
       display: none;
       @media (max-width: 650px) {
          display: block;
       }
     }

     span.name {
       font-size: 16px;
       text-transform: uppercase;
       font-weight: bold;
     }

     @media (max-width: 800px) {
       padding: 10px;
        span.name {
        font-size: 14px;
       }
     }

     @media (max-width: 500px) {
       svg {
         font-size: 20px;
       }
     }
`;