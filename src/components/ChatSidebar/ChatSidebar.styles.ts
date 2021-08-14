import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  width: 320px;
  top: 60px;
  bottom: 0;
  background-color: #120f13;
  color: #e0e0e0;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .search {
    width: 100%;
    position: relative;
    margin-bottom: 30px;

    input {
      width: 100%;
      outline: none;
      border: none;
      background: #3c393f;
      border-radius: 8px;
      padding: 10px 10px 10px 35px;
      color: #e0e0e0;
    }
    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      font-size: 18px;
    }
  }

  .channels {
    /* padding-top: 30px; */
    height: 300px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #252329;
      border-radius: 30px;
    }
    .channels-item {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
      cursor: pointer;
      width: 100%;

      .cap {
        padding: 6px;
        background: #252329;
        border-radius: 8px;
        font-size: 16px;
        text-transform: uppercase;
        color: #e0e0e0;
        margin-right: 10px;
      }
      .name {
        text-transform: uppercase;
        font-size: 16px;
      }
    }
  }

  p.channel-name {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p.channel-desc {
    font-size: 16px;
    font-weight: normal;
    line-height: 22px;
    margin-bottom: 25px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .channel-mems {
    .title {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 25px;
    }

    .mems-wrapper {
      overflow-y: auto;
      height: 250px;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #252329;
        border-radius: 30px;
      }
      &::-webkit-scrollbar-track {
      }
      .mems-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 42px;
          height: 42px;
          object-fit: cover;
          border-radius: 7px;
          margin-right: 20px;
        }
        span {
          font-size: 14px;
          color: #828282;
          font-weight: bold;
        }
      }
    }
  }

  .user {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #0b090c;
    width: 100%;
    padding: 10px 20px;
    button {
      background-color: transparent;
      color: #828282;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
          object-fit: cover;
          border-radius: 7px;
          margin-right: 20px;
        }
        span {
          font-weight: bold;
        }
      }
    }
  }

  @media (max-width: 650px) {
    position: absolute;
    width: 270px;
    transition: all 0.25s ease-in-out;
    z-index: 100;
    transform-origin: 0 0;
    transform: ${({ isShowLeft }: { isShowLeft: boolean }) =>
      isShowLeft ? 'scaleX(1)' : 'scaleX(0)'};
  }

  @media (max-width: 500px) {
    p.channel-name,
    p.channel-desc {
      font-size: 14px;
    }

    .channel-mems {
      .title {
        font-size: 14px;
      }
    }
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  bottom: 33px;
  right: 22px;
  z-index: 200;
  padding: 10px;
  background-color: #252329;
  border: 1px solid #3c393f;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  ul {
    a {
      display: flex;
      align-items: center;
      width: 100%;
      transition: all 0.25s ease-in-out;
      padding: 10px;
      width: 140px;
      border-radius: 8px;
      color: #e0e0e0;
      font-weight: 500;
      font-size: 12px;

      &:hover {
        background-color: #3c393f;
      }

      svg {
        margin-right: 10px;
        font-size: 20px;
      }
    }
  }
`;
