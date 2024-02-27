// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HealthContractCaller {
    function heartRateMonitor(uint bpm, uint min, uint max) public pure returns (uint code) {
        return heartRateAnalyze(bpm, min, max);
    }
    
    function glucoseMonitor(uint glucoseLevel, uint low, uint high) public pure returns (uint code) {
        return glucoseAnalyze(glucoseLevel, low, high);
    }

    function heartRateAnalyze(uint bpm, uint min, uint max) public pure returns (uint) {
        uint x = 5;
        if (bpm < min || bpm > max) {
            if (bpm < min - 20 || bpm > max + 20) {
                x = 2;
                return x;
            }
            x = 1;
            return x;
        } else {
            x = 0;
            return x;
        }
    }

    function glucoseAnalyze(uint glucoseLevel, uint low, uint high) public pure returns (uint) {
        uint x = 5;
        if (glucoseLevel < low || glucoseLevel > high) {
            if (glucoseLevel < low - 20 || glucoseLevel > high + 80) {
                if (glucoseLevel > high + 140) {
                    x = 3;
                    return x;
                }
                x = 2;
                return x;
            }
            x = 1;
            return x;
        } else {
            x = 0;
            return x;
        }
    }
}
