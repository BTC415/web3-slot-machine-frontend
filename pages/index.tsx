/** @jsxImportSource @emotion/react */
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import axios from "axios";
import { useSlotMachineStyles } from "../components/SlotMachine.style";
import { useEffect, useState, useRef } from "react";
import Display from "seven-segment-display";
import { useEthers } from "@usedapp/core";
import { ethers, BigNumber } from "ethers";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = localFont({
  src: [
    {
      path: "../public/Geometria.ttf",
      weight: "400",
    },
  ],
  variable: "--font-poppins",
});
type SlotsType = {
  id: string;
  y: string;
  durationSeconds: number;
  items: {
    id: string;
    value: string;
  }[];
}[];
let order1 = 0;
export default function Home() {
  const styles = useSlotMachineStyles();
  const [slots, setSlots] = useState<SlotsType>([]);
  const [slotCount, setSlotCount] = useState<number>(5);
  const [itemCount, setItemCount] = useState<number>(64);
  const [bet, setBet] = useState<number>(0.4);
  const [winModalShow, setWinModalShow] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);
  const [shopWindow, setShopWindow] = useState(false);
  const [etherBalence, setEtherBalence] = useState("");
  const [etherPrice, setEtherPrice] = useState("");
  let resul = [];
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const [ethAmount, setEthAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const isConnected = account !== undefined;
  const [balance, setBalence] = useState(0);
  const [isMute, setMute] = useState(true);
  const [winStatus, setWinStatus] = useState(false);
  const [winWidth, setWinWidth] = useState<number>();
  const [balanceArray, setBalenceArray] = useState([]);
  const [balanceFirst, setBalanceFirst] = useState(0);
  const [left, setLeft] = useState("0px");
  const [bonusNum, setBonusNum] = useState(0);
  const [bonusWindow, setBounsWindow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [ml, setMl] = useState<object>();
  const [autoWin, setAutoWin] = useState(false);
  const [menuWindow, setMenuWindow] = useState(false);
  const [autoBuyPlay, setAutoPlay] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoPage, setInfoPage] = useState(1);
  const [changeBalance, setChangeBalance] = useState(true);
  const [depositSet, setDepositSet] = useState(true);
  const [loading, setLoading] = useState(false);
  const [oneAutoSum, setOneAutoSum] = useState(0);
  const getRandomItem = () => {
    return [
      "/1.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/9.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
      "/2.png",
      "/3.png",
      "/9.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/2.png",
      "/3.png",
      "/15.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/2.png",
    ][Math.floor(Math.random() * 40)];
  };

  const getRandomItem2 = () => {
    return [
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
    ][Math.floor(Math.random() * 16)];
  };
  // autoSpin
  const getRandomItem1 = () => {
    return [
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/9.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
      "/19.png",
      "/20.png",
      "/21.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/15.png",
      "/16.png",
      "/17.png",
      "/18.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/7.png",
      "/8.png",
      "/10.png",
      "/11.png",
      "/12.png",
      "/13.png",
      "/14.png",
    ][Math.floor(Math.random() * 76)];
  };
  let wildArray = [];
  const [autoSum, setAutoSum] = useState(0);
  const getMax1 = (array) => {
    let mainItem = array[0];
    let k = 1;
    let wildNum = 0;
    let matchArray = [array[0]];
    for (var i = 1; i < array.length; i++) {
      if (
        mainItem === "/9.png" ||
        mainItem === "/19.png" ||
        mainItem === "/20.png" ||
        mainItem === "/21.png"
      ) {
        if (
          array[i] !== "/9.png" &&
          array[i] !== "/19.png" &&
          array[i] !== "/20.png" &&
          array[i] !== "/21.png"
        ) {
          mainItem = array[i];
          k++;
          matchArray.push(array[i]);
        } else if (
          array[i] === "/9.png" ||
          array[i] === "/19.png" ||
          array[i] === "/20.png" ||
          array[i] === "/21.png"
        ) {
          k++;
          matchArray.push(array[i]);
        }
      } else if (
        mainItem !== "/9.png" &&
        mainItem !== "/19.png" &&
        mainItem !== "/20.png" &&
        mainItem !== "/21.png"
      ) {
        if (
          array[i] !== "/9.png" &&
          array[i] !== "/19.png" &&
          array[i] !== "/20.png" &&
          array[i] !== "/21.png"
        ) {
          if (mainItem === array[i]) {
            k++;
            matchArray.push(array[i]);
          }
        } else if (
          array[i] === "/9.png" ||
          array[i] === "/19.png" ||
          array[i] === "/20.png" ||
          array[i] === "/21.png"
        ) {
          k++;
          matchArray.push(array[i]);
        }
      }
    }
    if (k < 3) return 0;
    else if (k >= 3) {
      for (var i = 0; i <= matchArray.length; i++) {
        if (matchArray[i] === "/19.png") wildNum = wildNum + 2;
        else if (matchArray[i] === "/20.png") wildNum = wildNum + 3;
        else if (matchArray[i] === "/21.png") wildNum = wildNum + 4;
      }
      const item = {
        item: mainItem,
        number: k,
        wildNum: wildNum,
      };
      return item;
    }
  };

  const checkWin1 = () => {
    let a = [];
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 3].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 2].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 1].value);
    });
    for (let i = 0; i <= 14; i++) {
      if (
        a[i] === "/9.png" ||
        a[i] === "/19.png" ||
        a[i] === "/20.png" ||
        a[i] === "/21.png"
      ) {
        wildArray.push({
          item: a[i],
          position: i,
        });
      }
    }
    let itemsArray = [];
    // a[11] = "/9.png";
    // a[7] = "/9.png";
    // a[3] = "/9.png";
    itemsArray[1] = [a[5], a[6], a[7], a[8], a[9]];
    itemsArray[2] = [a[0], a[1], a[2], a[3], a[4]];
    itemsArray[3] = [a[10], a[11], a[12], a[13], a[14]];
    itemsArray[4] = [a[0], a[6], a[12], a[8], a[4]];
    itemsArray[5] = [a[10], a[6], a[2], a[8], a[14]];
    itemsArray[6] = [a[5], a[1], a[2], a[3], a[9]];
    itemsArray[7] = [a[5], a[11], a[12], a[13], a[9]];
    itemsArray[8] = [a[0], a[1], a[7], a[13], a[14]];
    itemsArray[9] = [a[10], a[11], a[7], a[3], a[4]];
    itemsArray[10] = [a[5], a[1], a[7], a[13], a[9]];
    itemsArray[11] = [a[5], a[11], a[7], a[3], a[9]];
    itemsArray[12] = [a[0], a[6], a[7], a[8], a[4]];
    itemsArray[13] = [a[10], a[6], a[7], a[8], a[14]];
    itemsArray[14] = [a[0], a[6], a[2], a[8], a[4]];
    itemsArray[15] = [a[10], a[6], a[12], a[8], a[14]];
    itemsArray[16] = [a[5], a[6], a[2], a[8], a[9]];
    itemsArray[17] = [a[5], a[6], a[12], a[8], a[9]];
    itemsArray[18] = [a[0], a[1], a[12], a[3], a[4]];
    itemsArray[19] = [a[10], a[11], a[2], a[13], a[14]];
    itemsArray[20] = [a[0], a[11], a[12], a[13], a[4]];
    itemsArray[21] = [a[10], a[1], a[2], a[3], a[14]];
    itemsArray[22] = [a[5], a[1], a[12], a[3], a[9]];
    itemsArray[23] = [a[5], a[11], a[2], a[13], a[9]];
    itemsArray[24] = [a[0], a[11], a[2], a[13], a[4]];
    itemsArray[25] = [a[10], a[1], a[12], a[3], a[14]];
    let bonusNum = 0;
    for (let i = 0; i <= 14; i++) {
      if (a[i] === "/1.png") {
        bonusNum++;
      }
    }
    if (bonusNum >= 3) {
      setBonusNum(10);
      setBounsWindow(true);
    } else if (bonusNum < 3) {
      let maxArray = [];
      const getBetResult = (result) => {
        let betResult = 0;
        if (result.item === "/2.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/3.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/4.png") {
          if (result.number === 3) betResult = 0.5 * bet;
          else if (result.number === 4) betResult = 1.5 * bet;
          else if (result.number === 5) betResult = 10 * bet;
        } else if (result.item === "/5.png") {
          if (result.number === 3) betResult = 0.4 * bet;
          else if (result.number === 4) betResult = 1.3 * bet;
          else if (result.number === 5) betResult = 9 * bet;
        } else if (result.item === "/6.png") {
          if (result.number === 3) betResult = 0.3 * bet;
          else if (result.number === 4) betResult = 1.2 * bet;
          else if (result.number === 5) betResult = 8 * bet;
        } else if (result.item === "/7.png") {
          if (result.number === 3) betResult = 0.3 * bet;
          else if (result.number === 4) betResult = 1.2 * bet;
          else if (result.number === 5) betResult = 8 * bet;
        } else if (result.item === "/8.png") {
          if (result.number === 3) betResult = 0.4 * bet;
          else if (result.number === 4) betResult = 1.3 * bet;
          else if (result.number === 5) betResult = 9 * bet;
        } else if (result.item === "/10.png") {
          if (result.number === 3) betResult = 0.6 * bet;
          else if (result.number === 4) betResult = 1.6 * bet;
          else if (result.number === 5) betResult = 15 * bet;
        } else if (result.item === "/11.png") {
          if (result.number === 3) betResult = 1 * bet;
          else if (result.number === 4) betResult = 2 * bet;
          else if (result.number === 5) betResult = 17 * bet;
        } else if (result.item === "/12.png") {
          if (result.number === 3) betResult = 1.2 * bet;
          else if (result.number === 4) betResult = 2.5 * bet;
          else if (result.number === 5) betResult = 20 * bet;
        } else if (result.item === "/13.png") {
          if (result.number === 3) betResult = 1.5 * bet;
          else if (result.number === 4) betResult = 3 * bet;
          else if (result.number === 5) betResult = 25 * bet;
        } else if (result.item === "/14.png") {
          if (result.number === 3) betResult = 0.25 * bet;
          else if (result.number === 4) betResult = 1 * bet;
          else if (result.number === 5) betResult = 7 * bet;
        } else if (result.item === "/15.png") {
          if (result.number === 3) betResult = 0.2 * bet;
          else if (result.number === 4) betResult = 0.75 * bet;
          else if (result.number === 5) betResult = 6 * bet;
        } else if (result.item === "/16.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/17.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/18.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        }
        if (result.wildNum === 0) return betResult;
        else return betResult * result.wildNum;
      };
      for (var i = 1; i <= 25; i++) {
        maxArray[i] = getMax1(itemsArray[i]);
      }
      let matchArray = [];
      for (var i = 1; i <= maxArray.length; i++) {
        if (maxArray[i] != undefined && maxArray[i] != 0)
          matchArray.push({
            bettingLine: i,
            item: maxArray[i].item,
            number: maxArray[i].number,
            wildNum: maxArray[i].wildNum,
          });
      }
      setResult([...matchArray]);
      resul = matchArray;

      let sum = 0;
      for (var i = 0; i < matchArray.length; i++) {
        if (matchArray[i].item !== "/1.png") {
          const num = getBetResult(matchArray[i]);
          sum += num;
        }
      }
      setTotal(sum);
      setAutoSum(autoSum + sum);
    }
  };
  async function autoSpin() {
    setFlag(false);
    setSpinning(true);
    let maxDuration = 0;
    slots.forEach((row, index) => {
      row.y = "0";
      row.durationSeconds = 2 + index;
      if (row.durationSeconds > maxDuration) {
        maxDuration = row.durationSeconds;
      }
    });

    setSlots([...slots]);
    setTimeout(() => {
      checkWin1();
      spinReset1();
      setFlag(true);
      setBonusNum(bonusNum - 1);
    }, maxDuration * 1200);
  }
  const bonusBuy = async () => {
    spinReset1()
    const bonusPrice = 150 * bet;
    if (balance < bonusPrice) {
      toast("You don't have enough balance", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const response = await axios.post(
        "https://slot-server.onrender.com/api/spin/bonusBuy",
        {
          data: {
            walletAddress: account,
            amount: bonusPrice,
          },
        }
      );
      if (response.data) {
        setAutoPlay(true);
        setBalence(parseFloat(response.data.balance));
        setBonusNum(10);
      }
    }
  };

  const sendResultAutoSum = async () => {
    const response = await axios.post(
      "https://slot-server.onrender.com/api/spin/win",
      {
        data: {
          walletAddress: account,
          amount: autoSum,
        },
      }
    );
    setBalence(parseFloat(response.data));
  };

  useEffect(() => {
    if (flag === true && bonusNum > 0) {
      autoSpin();
    }
    if (flag === true && bonusNum === 0) {
      setOneAutoSum(autoSum);
      sendResultAutoSum();
      setAutoWin(true);
      setSpinCounter(0);
      setSpinning(false);
      setChangeBalance(true);
      setAutoSum(0);
    }
  }, [flag]);

  const autoPlay = async () => {
    
    wildArray.length = 0;
    autoSpin();
  };
  const spinReset1 = () => {
    return new Promise((resolve, reject) => {
      slots.forEach((row) => {
        row.durationSeconds = 0;
      });
      generateSlots1(slotCount, itemCount, slots);
      setSpinning(true);
    });
  };
  const generateSlots1 = (
    slotCount: number,
    itemCount: number,
    slots: SlotsType = []
  ) => {
    const generatedSlots: SlotsType = [];
    if (bonusNum === 1) wildArray = [];

    for (let slot = 0; slot < slotCount; slot++) {
      generatedSlots.push({
        id: String(crypto.randomUUID()),
        y: `${itemCount * 5 - 4 * 4 + 1}rem`,
        durationSeconds: 0,
        items: [],
      });

      for (let item = 0; item < itemCount; item++) {
        const oldSlots = slots[slot]?.items;
        if (oldSlots && item < 3 && oldSlots.length >= 3) {
          generatedSlots[slot].items.push(oldSlots[oldSlots.length - 3 + item]);
          continue;
        }
        if (slot == 1 || slot === 2 || slot === 3) {
          const randomItem = getRandomItem1();
          generatedSlots[slot].items.push({
            id: String(crypto.randomUUID()),
            value: randomItem,
          });
        } else if(slot === 0 || slot === 4){
          const randomItem = getRandomItem2();
          generatedSlots[slot].items.push({
            id: String(crypto.randomUUID()),
            value: randomItem,
          });
        }
      }
    }
    let array = generatedSlots;
    if (wildArray.length !== 0) {
      for (let i = 0; i < wildArray.length; i++) {
        if (wildArray[i].position === 0) {
          array[0].items[61].value = wildArray[i].item;
          array[0].items[62].value = getRandomItem2();
          array[0].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 5) {
          array[0].items[62].value = wildArray[i].item;
          array[0].items[61].value = getRandomItem2();
          array[0].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 10) {
          array[0].items[63].value = wildArray[i].item;
          array[0].items[62].value = getRandomItem2();
          array[0].items[61].value = getRandomItem2();
        } else if (wildArray[i].position === 1) {
          array[1].items[61].value = wildArray[i].item;
          array[1].items[62].value = getRandomItem2();
          array[1].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 6) {
          array[1].items[62].value = wildArray[i].item;
          array[1].items[61].value = getRandomItem2();
          array[1].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 11) {
          array[1].items[63].value = wildArray[i].item;
          array[1].items[61].value = getRandomItem2();
          array[1].items[62].value = getRandomItem2();
        } else if (wildArray[i].position === 2) {
          array[2].items[61].value = wildArray[i].item;
          array[2].items[62].value = getRandomItem2();
          array[2].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 7) {
          array[2].items[62].value = wildArray[i].item;
          array[2].items[61].value = getRandomItem2();
          array[2].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 12) {
          array[2].items[63].value = wildArray[i].item;
          array[2].items[61].value = getRandomItem2();
          array[2].items[62].value = getRandomItem2();
        } else if (wildArray[i].position === 3) {
          array[3].items[61].value = wildArray[i].item;
          array[3].items[62].value = getRandomItem2();
          array[3].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 8) {
          array[3].items[62].value = wildArray[i].item;
          array[3].items[61].value = getRandomItem2();
          array[3].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 13) {
          array[3].items[63].value = wildArray[i].item;
          array[3].items[62].value = getRandomItem2();
          array[3].items[61].value = getRandomItem2();
        } else if (wildArray[i].position === 4) {
          array[4].items[61].value = wildArray[i].item;
          array[4].items[62].value = getRandomItem2();
          array[4].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 9) {
          array[4].items[62].value = wildArray[i].item;
          array[4].items[61].value = getRandomItem2();
          array[4].items[63].value = getRandomItem2();
        } else if (wildArray[i].position === 14) {
          array[4].items[63].value = wildArray[i].item;
          array[4].items[61].value = getRandomItem2();
          array[4].items[62].value = getRandomItem2();
        }
      }
    }

    setSlots(array);
  };

  //
  const generateSlots = (
    slotCount: number,
    itemCount: number,
    slots: SlotsType = []
  ) => {
    const generatedSlots: SlotsType = [];

    for (let slot = 0; slot < slotCount; slot++) {
      generatedSlots.push({
        id: String(crypto.randomUUID()),
        y: `${itemCount * 5 - 4 * 4 + 1}rem`,
        durationSeconds: 0,
        items: [],
      });

      for (let item = 0; item < itemCount; item++) {
        const oldSlots = slots[slot]?.items;
        if (oldSlots && item < 3 && oldSlots.length >= 3) {
          generatedSlots[slot].items.push(oldSlots[oldSlots.length - 3 + item]);
          continue;
        }
        const randomItem = getRandomItem();
        generatedSlots[slot].items.push({
          id: String(crypto.randomUUID()),
          value: randomItem,
        });
      }
    }

    setSlots(generatedSlots);
  };
  const depositWindow = () => {
    if (!account) {
      toast("Please connect wallet", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setShopWindow(true);
      getBalance(account);
    }
  };

  const getMax = (array) => {
    let mainItem = array[0];
    let k = 1;
    let wildNum = 0;
    let matchArray = [array[0]];
    for (var i = 1; i < array.length; i++) {
      if (mainItem === "/9.png" && array[i] !== "/9.png") {
        mainItem = array[i];
        k++;
        matchArray.push(array[i]);
      } else if (mainItem !== "/9.png" && array[i] !== "/9.png") {
        if (mainItem === array[i]) {
          k++;
          matchArray.push(array[i]);
        } else break;
      } else if (mainItem === "/9.png" && array[i] === "/9.png") {
        k++;
        matchArray.push(array[i]);
      } else if (mainItem !== "/9.png" && array[i] === "/9.png") {
        k++;
        matchArray.push(array[i]);
      }
    }
    if (k < 3) return 0;
    else if (k >= 3) {
      for (var i = 0; i <= matchArray.length; i++) {
        if (matchArray[i] === "/9.png") wildNum++;
      }
      const item = {
        item: mainItem,
        number: k,
        wildNum: wildNum,
      };
      return item;
    }
  };
  let addBalance = 0;
  const [betNum1, setBetNum1] = useState(0);
  const [betNum2, setBetNum2] = useState(4);
  const betNumArray = [
    {
      a1: 0,
      a2: 4,
      bet: 0.4,
    },
    {
      a1: 0,
      a2: 8,
      bet: 0.8,
    },
    {
      a1: 1,
      a2: 2,
      bet: 1.2,
    },
    {
      a1: 2,
      a2: 0,
      bet: 2.0,
    },
    {
      a1: 5,
      a2: 0,
      bet: 5.0,
    },
  ];

  const setMaxBet = () => {
    if (changeBalance === true) {
      order1 = 4;
      setBetNum1(betNumArray[order1].a1);
      setBetNum2(betNumArray[order1].a2);
      setBet(betNumArray[order1].bet);
    } else null;
  };
  const setBetAdd = () => {
    if (changeBalance === true) {
      order1++;
      if (order1 !== 5) {
        setBetNum1(betNumArray[order1].a1);
        setBetNum2(betNumArray[order1].a2);
        setBet(betNumArray[order1].bet);
      } else if (order1 === 5) {
        order1 = 0;
        setBetNum1(betNumArray[order1].a1);
        setBetNum2(betNumArray[order1].a2);
        setBet(betNumArray[order1].bet);
      }
    } else null;
  };
  const setBetMinus = () => {
    if (changeBalance === true) {
      order1--;
      if (order1 !== -1) {
        setBetNum1(betNumArray[order1].a1);
        setBetNum2(betNumArray[order1].a2);
        setBet(betNumArray[order1].bet);
      } else if (order1 === -1) {
        order1 = 4;
        setBetNum1(betNumArray[order1].a1);
        setBetNum2(betNumArray[order1].a2);
        setBet(betNumArray[order1].bet);
      }
    } else null;
  };

  const checkWin = async () => {
    let a = [];
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 3].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 2].value);
    });
    slots.forEach((slot) => {
      a.push(slot.items[slot.items.length - 1].value);
    });
    let itemsArray = [];
    // a[11] = "/9.png";
    // a[7] = "/9.png";
    // a[3] = "/9.png";
    // a[11] = "/1.png";
    // a[7] = "/1.png";
    // a[3] = "/1.png";
    itemsArray[1] = [a[5], a[6], a[7], a[8], a[9]];
    itemsArray[2] = [a[0], a[1], a[2], a[3], a[4]];
    itemsArray[3] = [a[10], a[11], a[12], a[13], a[14]];
    itemsArray[4] = [a[0], a[6], a[12], a[8], a[4]];
    itemsArray[5] = [a[10], a[6], a[2], a[8], a[14]];
    itemsArray[6] = [a[5], a[1], a[2], a[3], a[9]];
    itemsArray[7] = [a[5], a[11], a[12], a[13], a[9]];
    itemsArray[8] = [a[0], a[1], a[7], a[13], a[14]];
    itemsArray[9] = [a[10], a[11], a[7], a[3], a[4]];
    itemsArray[10] = [a[5], a[1], a[7], a[13], a[9]];
    itemsArray[11] = [a[5], a[11], a[7], a[3], a[9]];
    itemsArray[12] = [a[0], a[6], a[7], a[8], a[4]];
    itemsArray[13] = [a[10], a[6], a[7], a[8], a[14]];
    itemsArray[14] = [a[0], a[6], a[2], a[8], a[4]];
    itemsArray[15] = [a[10], a[6], a[12], a[8], a[14]];
    itemsArray[16] = [a[5], a[6], a[2], a[8], a[9]];
    itemsArray[17] = [a[5], a[6], a[12], a[8], a[9]];
    itemsArray[18] = [a[0], a[1], a[12], a[3], a[4]];
    itemsArray[19] = [a[10], a[11], a[2], a[13], a[14]];
    itemsArray[20] = [a[0], a[11], a[12], a[13], a[4]];
    itemsArray[21] = [a[10], a[1], a[2], a[3], a[14]];
    itemsArray[22] = [a[5], a[1], a[12], a[3], a[9]];
    itemsArray[23] = [a[5], a[11], a[2], a[13], a[9]];
    itemsArray[24] = [a[0], a[11], a[2], a[13], a[4]];
    itemsArray[25] = [a[10], a[1], a[12], a[3], a[14]];
    let bonusNum = 0;
    for (let i = 0; i <= 14; i++) {
      if (a[i] === "/1.png") {
        bonusNum++;
      }
    }
    if (bonusNum >= 3) {
      setBonusNum(10);
      setBounsWindow(true);
    } else if (bonusNum < 3) {
      let maxArray = [];
      const getBetResult = (result) => {
        let betResult = 0;
        if (result.item === "/2.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/3.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/4.png") {
          if (result.number === 3) betResult = 0.5 * bet;
          else if (result.number === 4) betResult = 1.5 * bet;
          else if (result.number === 5) betResult = 10 * bet;
        } else if (result.item === "/5.png") {
          if (result.number === 3) betResult = 0.4 * bet;
          else if (result.number === 4) betResult = 1.3 * bet;
          else if (result.number === 5) betResult = 9 * bet;
        } else if (result.item === "/6.png") {
          if (result.number === 3) betResult = 0.3 * bet;
          else if (result.number === 4) betResult = 1.2 * bet;
          else if (result.number === 5) betResult = 8 * bet;
        } else if (result.item === "/7.png") {
          if (result.number === 3) betResult = 0.3 * bet;
          else if (result.number === 4) betResult = 1.2 * bet;
          else if (result.number === 5) betResult = 8 * bet;
        } else if (result.item === "/8.png") {
          if (result.number === 3) betResult = 0.4 * bet;
          else if (result.number === 4) betResult = 1.3 * bet;
          else if (result.number === 5) betResult = 9 * bet;
        } else if (result.item === "/10.png") {
          if (result.number === 3) betResult = 0.6 * bet;
          else if (result.number === 4) betResult = 1.6 * bet;
          else if (result.number === 5) betResult = 15 * bet;
        } else if (result.item === "/11.png") {
          if (result.number === 3) betResult = 1 * bet;
          else if (result.number === 4) betResult = 2 * bet;
          else if (result.number === 5) betResult = 17 * bet;
        } else if (result.item === "/12.png") {
          if (result.number === 3) betResult = 1.2 * bet;
          else if (result.number === 4) betResult = 2.5 * bet;
          else if (result.number === 5) betResult = 20 * bet;
        } else if (result.item === "/13.png") {
          if (result.number === 3) betResult = 1.5 * bet;
          else if (result.number === 4) betResult = 3 * bet;
          else if (result.number === 5) betResult = 25 * bet;
        } else if (result.item === "/14.png") {
          if (result.number === 3) betResult = 0.25 * bet;
          else if (result.number === 4) betResult = 1 * bet;
          else if (result.number === 5) betResult = 7 * bet;
        } else if (result.item === "/15.png") {
          if (result.number === 3) betResult = 0.2 * bet;
          else if (result.number === 4) betResult = 0.75 * bet;
          else if (result.number === 5) betResult = 6 * bet;
        } else if (result.item === "/16.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/17.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        } else if (result.item === "/18.png") {
          if (result.number === 3) betResult = 0.15 * bet;
          else if (result.number === 4) betResult = 0.6 * bet;
          else if (result.number === 5) betResult = 4 * bet;
        }
        return betResult;
      };
      for (var i = 1; i <= 25; i++) {
        maxArray[i] = getMax(itemsArray[i]);
      }
      let matchArray = [];
      for (var i = 1; i <= maxArray.length; i++) {
        if (maxArray[i] != undefined && maxArray[i] != 0)
          matchArray.push({
            bettingLine: i,
            item: maxArray[i].item,
            number: maxArray[i].number,
            wildNum: maxArray[i].wildNum,
          });
      }
      setResult([...matchArray]);
      resul = matchArray;

      let sum = 0;
      for (var i = 0; i < matchArray.length; i++) {
        if (matchArray[i].item !== "/1.png") {
          const num = getBetResult(matchArray[i]);
          sum += num;
        }
      }
      setTotal(sum);
      addBalance = sum;
    }
  };

  const spinReset = () => {
    return new Promise((resolve, reject) => {
      slots.forEach((row) => {
        row.durationSeconds = 0;
      });
      generateSlots(slotCount, itemCount, slots);
      setSpinning(false);
    });
  };
  const spinReset2 = () => {
    return new Promise((resolve, reject) => {
      slots.forEach((row) => {
        row.durationSeconds = 0;
      });
      generateSlots(slotCount, itemCount, slots);
      setSpinning(false);
      setSpinCounter(spinCounter + 1);
    });
  };
  const transfor = async () => {
    if (depositSet === false) null;
    else {
      if (ethAmount >= parseFloat(etherBalence)) {
        toast("You don't have enough ETHs", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "error",
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setDepositSet(false);
        const weiAmountValue = ethers.utils.parseEther(ethAmount.toString());
        const addressToValue = "0x746eb02223208d47b7982ec5239558efd961baf8";
        const transactionRequest = {
          to: addressToValue,
          value: weiAmountValue.toString(),
        };
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const receipt = await signer.sendTransaction(transactionRequest);
        if (receipt !== null) {
          const response = await axios.post(
            "https://slot-server.onrender.com/api/spin/deposit",
            {
              data: {
                walletAddress: account,
                amount: usdAmount,
              },
            }
          );
          setBalence(parseFloat(response.data));
        }
        setTimeout(() => {
          setDepositSet(true);
        }, 30000);
      }
    }
  };

  const fetchEtherPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const ethPrice = await response.json();
    const usd = ethPrice.ethereum.usd;
    setEtherPrice(usd);
  };

  const sendResult = async () => {
    const response = await axios.post(
      "https://slot-server.onrender.com/api/spin/win",
      {
        data: {
          walletAddress: account,
          amount: addBalance,
        },
      }
    );
    setBalence(parseFloat(response.data));
  };
  const [spinCounter, setSpinCounter] = useState(0);
  const spin = async () => {
    if (spinCounter === 3) {
      setSpinCounter(0);
    }
    if (balance < bet) {
      toast("You don't have enough balance", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (balance >= bet) {
      spinReset();
      setSpinning(true);
      let maxDuration = 0;
      slots.forEach((row, index) => {
        row.y = "0";
        row.durationSeconds = 2 + index;
        if (row.durationSeconds > maxDuration) {
          maxDuration = row.durationSeconds;
        }
      });
      setSlots([...slots]);
      setTimeout(() => {
        checkWin();
        if (resul.length !== 0) {
          setWinModalShow(true),
            setSpinning(false),
            setWinStatus(true),
            sendResult();
          setSpinCounter(spinCounter + 1);
        } else if (resul.length === 0) {
          spinReset(), setWinStatus(false);
        }
      }, maxDuration * 1200);
      const response = await axios.post(
        "https://slot-server.onrender.com/api/spin/betStart",
        {
          data: {
            walletAddress: account,
            amount: bet,
          },
        }
      );
      setBalence(parseFloat(response.data));
    }

    ////////////////////////////////////////////////////////////////////////
  };
  const spinRotate = () => {
    if (spinCounter % 2 == 0) spin();
    else if (spinCounter % 2 == 1) spinReset2();
  };
  const getBalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.utils.formatEther(balance);
    setEtherBalence(parseFloat(balanceInEth).toFixed(2));
  };
  function handleChangeEthAmount(event) {
    setEthAmount(event.target.value);
    setUsdAmount(event.target.value * parseFloat(etherPrice));
  }
  function handleChangeUsdAmount(event) {
    setUsdAmount(event.target.value);
    setEthAmount(event.target.value / parseFloat(etherPrice));
  }
  const getBalence = async () => {
    if (account) {
      const response = await axios.post(
        "https://slot-server.onrender.com/api/spin/getBalence",
        {
          data: {
            walletAddress: account,
          },
        }
      );
      if (response.data !== "unexist") {
        setBalence(parseFloat(response.data));
      } else if (response.data === "unexist") {
        setBalence(0);
      }
    }
  };
  const withdraw = async () => {
    if(usdAmount < 10){
      toast("Withdraw amount too large, please allow for gas", {
        hideProgressBar: false,
        autoClose: 2000,
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (balance < usdAmount) {
        toast("You don't have enough balance", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "error",
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setLoading(true);
        const response = await axios.post(
          "https://slot-server.onrender.com/api/spin/withdraw",
          {
            data: {
              walletAddress: account,
              amount: ethAmount,
              usdAmount: usdAmount,
            },
          }
        );
        if (response.data === "error") null;
        else {
          setLoading(false);
          setBalence(parseFloat(response.data));
        }
      }
    }
    
  };
  const connectWallet = async () => {
    activateBrowserWallet();
    let chainID;
    try {
      await window.ethereum
        .request({ method: "eth_chainId" })
        .then((chainId) => {
          chainID = chainId;
        });
    } catch (error) {
      console.error(error); // Handle error appropriately
    }
    const ethereum = window.ethereum;
    if (chainID !== "0x1") {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }], // Change chainId to the desired network
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 7 segment
  const balanceLength = () => {
    let floatString = String(balance.toFixed(1));
    floatString = floatString.replace(".", "");
    let floatArray = floatString.split("").map(Number);
    setBalanceFirst(floatArray[floatArray.length - 1]);
    let array = [];
    for (let i = 0; i <= floatArray.length - 2; i++) {
      array.push(floatArray[i]);
    }
    if (array.length === 3)
      setLeft("2xl:left-[116px] xl:left-[93px] lg:left-[76px] left-[115px]");
    else if (array.length === 2)
      setLeft("2xl:left-[163px] xl:left-[131px] lg:left-[106px] left-[145px]");
    else if (array.length === 1)
      setLeft("2xl:left-[212px] xl:left-[171px] lg:left-[135px] left-[176px]");

    setBalenceArray(array);
  };
  const handleChangeInfo = (event) => {
    if (event === "plus") {
      if (infoPage + 1 > 6) null;
      else setInfoPage(infoPage + 1);
    } else if (event === "minus") {
      if (infoPage - 1 < 1) null;
      else setInfoPage(infoPage - 1);
    }
  };
  useEffect(() => {
    balanceLength();
  }, [balance]);

  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, []);
  useEffect(() => {
    if (account) {
      getBalence();
      fetchEtherPrice();
    } else setBalence(0);
  }, [account]);
  useEffect(() => {
    generateSlots(slotCount, itemCount);
  }, [slotCount, itemCount]);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 767) {
        const newMargin = (-233 + (windowWidth - 769)) / 2;

        setMl({
          marginLeft: newMargin.toString() + "px",
        });
      } else setMl({});
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial margin calculation

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const audioRef = useRef(null);
  useEffect(() => {
    // Set volume after the component mounts
    audioRef.current.volume = 0.4;
  }, []);

  return (
    <div
      className={`absolute h-full w-full md:overflow-hidden ${poppins.variable} font-sans`}
    >
      <iframe className="h-full w-full fixed" src="1.html"></iframe>
      <audio ref={audioRef} src="/music.mp3" loop={true} />
      <div className="flex fixed top-5 left-10 z-10">
        <button
          onClick={() => {
            if (!account) {
              toast("Please connect wallet", {
                hideProgressBar: false,
                autoClose: 2000,
                type: "error",
                position: toast.POSITION.TOP_RIGHT,
              });
            } else setMenuWindow(true);
          }}
        >
          <img src="/menu.png" className="h-4/5" />
        </button>
        {isMute ? (
          <button
            onClick={() => {
              setMute(false), audioRef.current.play();
            }}
          >
            <img className="ml-[-20px] h-4/5" src="/sound.png" />
          </button>
        ) : (
          <button
            onClick={() => {
              setMute(true), audioRef.current.pause();
            }}
          >
            <img className="ml-[-20px] h-4/5" src="/sound mute.png" />
          </button>
        )}
      </div>
      <div className="flex fixed top-[7rem] left-10 z-10">
        <button
          onClick={() => {
            setInfo(true);
          }}
        >
          <img src="/info.png" className="h-4/5" />
        </button>
      </div>
      <div className="absolute 2xl:top-[450px] 2xl:left-[284px] xl:top-[436px] xl:left-[232px] lg:top-[343px] lg:left-[182px] top-[523px] left-[222px] text-[#e1fc08] text-[50px] z-20">
        .
      </div>
      <div className="absolute 2xl:top-[460px] 2xl:left-[321px] xl:top-[452px] xl:left-[263px] lg:top-[369px] lg:left-[207px] top-[548px] left-[247px] z-20">
        <div className="2xl:w-[30px] xl:w-[25px] lg:w-[20px] w-[20px] segment">
          <Display
            value={balanceFirst}
            color="#e1fc08"
            className="segment"
            digitCount={1}
          />
        </div>
      </div>

      <div
        className={`vv absolute 2xl:top-[463px] xl:top-[455px] lg:top-[372px] top-[551px] ${left} z-20`}
      >
        <div className="inline-flex">
          {balanceArray.map((item, index) => (
            <div
              className={`2xl:w-[30px] 2xl:ml-[16px] xl:w-[25px] xl:ml-[14px] lg:w-[20px] lg:ml-[10px] ml-[10px] w-[20px] segment`}
              key={index}
            >
              <Display
                value={item}
                color="#e1fc08"
                className="balanceSegment"
                digitCount={1}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute 2xl:top-[651px] 2xl:left-[130px] xl:top-[586px] xl:left-[108px] lg:top-[468px] lg:left-[82px] top-[655px] left-[133px] z-20">
        <img
          src="/dollar.png"
          className="2xl:w-[33px] xl:w-[25px] lg:w-[20px]"
        />
      </div>
      <div className="flex fixed 2xl:top-[740px] lg:left-0 z-10 xl:top-[650px] lg:top-[500px] top-[700px] left-[40px]">
        <button onClick={() => setMaxBet()}>
          <img
            src="/max bet.png"
            className="2xl:w-[400px] xl:w-[350px] lg:w-[300px] w-[280px]"
          />
        </button>
      </div>
      <div className="flex fixed 2xl:top-[575px] xl:top-[520px] lg:top-[420px] top-[605px] lg:left-0 left-[50px] z-10">
        <div className="inline-flex">
          <button
            className="2xl:mt-[40px] xl:mt-[35px] lg:mt-[25px] mt-[25px]"
            onClick={() => setBetMinus()}
          >
            <img
              src="/minus.png"
              className="2xl:h-[120px] xl:h-[100px] lg:h-[75px] h-[75px]"
            />
          </button>
          <img
            src="/bet-2.png"
            className="2xl:w-[320px] 2xl:h-[160px] 2xl:ml-[-40px] xl:w-[250px] xl:ml-[-30px] xl:h-[133px] lg:w-[200px] lg:h-[100px] lg:ml-[-25px] w-[200px] h-[100px] ml-[-25px]"
          />
          <button
            onClick={() => setBetAdd()}
            className="2xl:ml-[-40px] 2xl:mt-[30px] xl:ml-[-30px] xl:mt-[20px] lg:ml-[-25px] lg:mt-[15px] ml-[-25px] mt-[15px]"
          >
            <img
              src="/add.png"
              className="2xl:h-[120px] xl:h-[100px] lg:h-[75px] h-[75px]"
            />
          </button>
        </div>
      </div>
      <div className="flex fixed 2xl:top-[354px] xl:top-[366px] lg:top-[300px] top-[480px] lg:left-0 left-[40px] z-10">
        <img
          src="/balance.png"
          className="2xl:w-[465px] xl:w-[380px] lg:w-[300px] w-[300px] 2xl:h-[229px] xl:h-[187px]"
        />
      </div>

      <div className="absolute 2xl:top-[465px] 2xl:left-[82px] xl:top-[456px] xl:left-[70px] lg:top-[372px] lg:left-[55px] top-[552px] left-[95px] z-20">
        <img
          src="/dollar.png"
          className="2xl:w-[33px] xl:w-[27px] lg:w-[20px] w-[21px]"
        />
      </div>
      <div
        className={`idenify flex fixed md:w-full w-[1000px] md:ml-0 items-center justify-center`}
        style={ml}
      >
        <div
          className={`2xl:w-[1438px] 2xl:mt-[88px] xl:w-[1288px] xl:mt-[88px] lg:w-[1000px] lg:mt-[88px] mt-[88px] w-[760px]`}
        >
          <img
            src="/slot mchn.png"
            className="2xl:w-[1438px] xl:w-[1288px] lg:w-[1000px]  md:w-[760px] w-[120%]"
          />
        </div>
      </div>
      <div className="flex fixed 2xl:top-[600px] xl:top-[600px] 2xl:right-[73px] lg:top-[445px] top-[500px] right-[30px] z-10">
        <button onClick={() => !spinning && spinRotate()}>
          <img src="/spin.png" className="2xl:h-[300px] h-[180px]" />
        </button>
      </div>
      <div className="flex fixed w-full mt-[172px] items-center justify-center">
        <div
          className="2xl:ml-[40px] 2xl:h-[509px] 2xl:mt-[97px] xl:h-[456px] xl:mt-[78px] xl:ml-[36px] lg:ml-[24px] lg:h-[356px] lg:mt-[42px] ml-[20px] h-[274px] mt-[8px] "
          css={styles.rowsContainer}
        >
          {slots.map((slot) => (
            <div
              css={styles.slotsContainer}
              key={slot.id}
              style={{
                transform: `translateY(${slot.y})`,
                transitionDuration: `${slot.durationSeconds}s`,
              }}
            >
              {slot.items.map((item) => (
                <div
                  key={item.id}
                  className="2xl:w-[132px] 2xl:h-[151px] xl:w-[117px] xl:h-[134px] lg:w-[92px] lg:h-[100px] w-[69px] h-[73px]"
                  css={styles.slotContainer}
                >
                  <img src={item.value} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute segment 2xl:top-[651px] 2xl:left-[177px] xl:top-[585px] xl:left-[144px] lg:top-[469px] lg:left-[110px] top-[656px] left-[163px] z-20 xl:w-[25px] 2xl:w-[30px] lg:w-[18px] w-[15px]">
        <Display
          value={betNum1}
          color="#e1fc08"
          className="segment"
          digitCount={1}
        />
      </div>
      <div className="absolute segment 2xl:top-[648px] 2xl:left-[269px] 2xl:w-[30px] xl:top-[582px] xl:left-[217px] xl:w-[25px] lg:w-[20px] lg:top-[465px] lg:left-[168px] top-[654px] left-[220px] w-[15px] z-20">
        <Display
          value={betNum2}
          color="#e1fc08"
          className="segment"
          digitCount={1}
        />
      </div>
      <div className="absolute 2xl:top-[634px] 2xl:left-[234px] xl:top-[560px] xl:left-[186px] lg:top-[436px] lg:left-[144px] top-[620px] left-[194px] z-20 text-[53px] text-[#e1fc08]">
        .
      </div>
      {winModalShow ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setWinModalShow(false);
                setSpinning(false);
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/window.png" />
            <div className="flex fixed items-center justify-center">
              <div className="flow-root">
                <div className="flow-root mt-[212px] w-[820px] h-[200px] items-center justify-center overflow-auto">
                  {result.map((item, index) => (
                    <div
                      className="text-center text-white text-[30px]"
                      key={index}
                    >
                      <div className="inline-flex mb-2">
                        You have matched in Betting line {item.bettingLine} with{" "}
                        {item.number}{" "}
                        <img className="w-[35px] mx-2" src={item.item} />{" "}
                        symbols
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-white text-[35px] mt-3">
                  Total: ${total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="flex fixed top-[50px] right-[50px]">
        {isConnected ? (
          <button onClick={deactivate}>
            <img className="w-[90px]" src="/disconnect.png" />
          </button>
        ) : (
          <button onClick={() => connectWallet()}>
            <img className="w-[90px]" src="/connectWallet.png" />
          </button>
        )}
      </div>
      <div className="flex fixed top-[140px] right-[50px]">
        <button onClick={() => depositWindow()}>
          <img className="w-[90px]" src="/deposit.png" />
        </button>
      </div>
      {shopWindow ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setShopWindow(false);
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/windowShop.png" />
            <div className="flex fixed">
              <div className="flow-root">
                <div>
                  <div className="inline-flex xl:mb-[15px] lg:mb-[10px]">
                    <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold">
                      Balance:
                    </div>
                    <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold xl:ml-[337px] lg:ml-[200px]">
                      $ {balance.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex xl:mb-[15px] lg:mb-[10px]">
                    <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold">
                      ETH Balance:
                    </div>
                    <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold xl:ml-[245px] lg:ml-[122px]">
                      {etherBalence} ETH
                    </div>
                  </div>
                </div>
                <div className="inline-flex w-full relative xl:mb-[15px] lg:mb-[10px]">
                  <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold">
                    ETH Price:
                  </div>
                  <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold xl:ml-[313px] lg:ml-[180px] right-0">
                    ${etherPrice}
                  </div>
                </div>
                <div className="xl:text-[40px] lg:text-[30px] text-[white] font-bold xl:mb-[15px] lg:mb-[10px]">
                  Withdraw/Deposit Amount
                </div>
                <div className="inline-flex xl:text-[40px] lg:text-[30px]  text-[white] font-bold xl:mb-[60px] lg:mb-[30px] mb-[20px]">
                  <div className="mr-[20px]">ETH: </div>
                  <input
                    className="text-slate-800 xl:w-[200px] lg:w-[130px] w-[80px] xl:text-[30px] lg:text-[25px] rounded-[20px] px-[20px] xl:mr-[50px] lg:mr-[20px]  hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
                    onChange={handleChangeEthAmount}
                    value={ethAmount}
                  />
                  <div className="mr-[20px]">USD:</div>
                  <input
                    className="text-slate-800 xl:w-[200px] lg:w-[130px] w-[80px] xl:text-[30px] lg:text-[25px] rounded-[20px] px-[20px] hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
                    onChange={handleChangeUsdAmount}
                    value={usdAmount}
                  />
                </div>
                <div>
                  <button
                    className="xl:w-[200px] lg:w-[150px] w-[120px] bg-white rounded-full lg:py-[10px] py-[5px] xl:text-[30px] lg:text-[25px] xl:mr-[280px] lg:mr-[150px] mr-[20px] font-semibold"
                    onClick={() => withdraw()}
                  >
                    {loading ? (
                      <>
                        <img className="h-[43px] mx-auto" src="/loading.gif" />
                      </>
                    ) : (
                      <>Withdraw</>
                    )}
                  </button>
                  <button
                    className="xl:w-[200px] lg:w-[150px] w-[120px] bg-white rounded-full lg:py-[10px] py-[5px] xl:text-[30px] lg:text-[25px] font-semibold"
                    onClick={() => transfor()}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {bonusWindow ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setBounsWindow(false), autoPlay();
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/bonusWindow.png" />
          </div>
        </>
      ) : null}
      <ToastContainer />
      {bonusNum !== 0 ? (
        <>
          <div className="flex fixed text-[50px] text-white w-full items-center justify-center">
            <div>{bonusNum} Spins Remaining</div>
          </div>
        </>
      ) : null}
      {autoWin ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setAutoWin(false);
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/windowShop.png" />
            <div className="flex fixed text-[40px] text-white">
              You have earned ${oneAutoSum.toFixed(2)} in total.
            </div>
          </div>
        </>
      ) : null}
      {menuWindow ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-[2]"
              onClick={() => {
                setMenuWindow(false);
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <img src="/windowShop.png" />
            <div className="flex fixed items-center justify-center">
              <div className="flow-root items-center justify-center">
                <div>
                  <div className="inline-flex text-[40px] text-white">
                    You may buy the &nbsp;
                    <img className="w-[50px]" src="/1.png" /> &nbsp; bonus
                    feature here
                  </div>
                </div>
                <div className="text-center text-[40px] text-white mt-[20px]">
                  for x150 bet amount.
                </div>
                <div className="flex items-center justify-center mx-auto text-black text-[35px] mt-[100px]">
                  <img className="w-[100px]" src="/1.png" />
                  <button
                    className="w-[200px] bg-gray-300 rounded-full py-[10px] text-[30px] ml-[50px] font-semibold"
                    onClick={() => bonusBuy()}
                  >
                    Buy
                  </button>
                </div>
                {autoBuyPlay ? (
                  <>
                    <div className="flex items-center justify-center mx-auto text-black text-[35px] mt-[70px]">
                      <button
                        className="w-[200px] bg-gray-300 rounded-full py-[10px] text-[30px] ml-[50px] font-semibold"
                        onClick={() => {
                          autoPlay(), setMenuWindow(false), setAutoPlay(false);
                          setChangeBalance(false);
                        }}
                      >
                        AutoPlay
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
      {info ? (
        <>
          <div className="flex fixed w-full h-full items-center justify-center bg-black/80 z-20  backdrop-blur-[4px]">
            <img src={"/info/" + infoPage + ".png"} />
          </div>
          <div className="flex fixed w-full h-full items-center bottom-[10px] z-20">
            <button
              className="absolute top-[40px] right-[35px] w-[15px] z-50"
              onClick={() => {
                setInfo(false);
              }}
            >
              <img src="/close1.svg"></img>
            </button>
            <div className="inline-flex w-full">
              <div className="w-1/3">
                <button
                  className="float-left"
                  onClick={() => {
                    handleChangeInfo("minus");
                  }}
                >
                  <img className="w-[57px] ml-[20px]" src="/info/before.png" />
                </button>
              </div>
              <div className="w-1/3"></div>
              <div className="w-1/3">
                <button
                  className="float-right"
                  onClick={() => {
                    handleChangeInfo("plus");
                  }}
                >
                  <img className="w-[57px] mr-[20px]" src="/info/next.png" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
