import styled from "styled-components";

export const Wrapper = styled.div`
   display: flex;
   margin-bottom: 25px;

   &:last-child {
      margin-bottom: 0;
   }

   .photo {
      img {
       width: 42px;
       height: 42px;
       object-fit: cover;
       border-radius: 7px;
       margin-right: 15px;
   
       @media (max-width: 650px) {
           width: 32px;
           height: 32px;
       }
      }
   }

   .content {
       .top {
           color: #828282;
           .name {
              font-size: 14px;
              font-weight: bold;
              margin-right: 10px;
           }
           .time {
               font-size: 12px;
               font-weight: normal;
           }
       }

       .bottom {
          line-height: 22px;
          color: #e0e0e0;
          font-size:12px;
       }
   }
`;