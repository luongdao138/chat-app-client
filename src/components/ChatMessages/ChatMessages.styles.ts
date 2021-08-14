import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: 320px;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #252329;

  .mess-container {
    flex-grow: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }

    .mess-time {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      &:first-child {
        .line-time {
          margin-top: 0;
        }
      }
      .line-time {
        display: flex;
        margin: 15px 0;
        align-items: center;
        span {
          font-size: 12px;
          font-weight: normal;
          color: #828282;
        }
        .left,
        .right {
          height: 0.5px;
          flex-grow: 1;
          background-color: #828282;
        }

        .left {
          margin-right: 8px;
        }
        .right {
          margin-left: 8px;
        }
      }
    }
  }

  .send {
    margin-top: 20px;
    width: 100%;
    position: relative;

    input {
      width: 100%;
      outline: none;
      border: none;
      background: #3c393f;
      border-radius: 8px;
      padding: 10px 50px 10px 14px;
      color: #e0e0e0;
    }

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 4px;
      display: flex;
      width: 32px;
      cursor: pointer;
      height: 32px;
      border-radius: 8px;
      background: #2f80ed;

      svg {
        margin: auto;
        color: #e0e0e0;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 10px;
  }

  @media (max-width: 650px) {
    margin-left: 0;
    padding: 10px;
  }
`;
