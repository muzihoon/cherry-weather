import React from 'react';

const Sweater = ({
                     size = 16,
                     width,
                     height,
                     stroke,
                     strokeWidth = 40,
                     fill = "none",
                     ...props
                 }) => {
    return (
        <svg
            width={size || width}
            height={size || height}
            stroke={stroke}
            strokeWidth="40"
            {...props}
            strokeLinecap="round"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777.34 785.14"
        >
            <path strokeWidth="40" className="cls-1"
                  d="M601.85,728l-21.54,30.51a16.71,16.71,0,0,1-13.68,6.68H212.78a16.73,16.73,0,0,1-13.68-6.68L177.56,728"/>
            <path strokeWidth="40" className="cls-1" d="M302.22,240.82,278,259.19a13,13,0,0,1-15.7,0l-24.22-18.37"/>
            <path strokeWidth="40" className="cls-1"
                  d="M315.48,112.26c-16.54,0-35.43,2.11-47.87-7.5a27.89,27.89,0,0,1-2.49-2.16c-6.85-6.72-11.21-17.93-11.21-36.56,0-52.06,43.64-45.81,43.64-45.81H389.7"/>
            <path strokeWidth="40" className="cls-1"
                  d="M228.88,348.67l-42,56.56s3.63,240.4,2.08,254.64-18.27,16.39-18.27,16.39H95c-24.91,0-24.91-23.88-24.91-23.88s-4.35-18-10.61-45.77"/>
            <path strokeWidth="40" className="cls-1"
                  d="M275,109s-86.49-7.59-126.18,37.58S59,257.9,59,257.9,7.36,319,22.92,420.29c9.8,63.72,26,139.14,36.6,186.32"/>
            <line  strokeWidth="40" x1="147.52" y1="456.11" x2="188.62" y2="402.87"/>
            <line  strokeWidth="40" x1="59.52" y1="606.61" x2="59.52" y2="606.61"/>
            <line strokeWidth="40" x1="189.23" y1="606.61" x2="59.52" y2="606.61"/>
            <path strokeWidth="40" className="cls-1"
                  d="M461.85,112.26c16.55,0,35.44,2.11,47.88-7.49a28.11,28.11,0,0,0,2.48-2.17c6.86-6.72,11.21-17.93,11.21-36.55,0-52.07-43.63-45.81-43.63-45.81H387.64"/>
            <path strokeWidth="40" className="cls-1"
                  d="M502.3,109s86.49-7.59,126.18,37.58S718.36,257.9,718.36,257.9,770,319,754.41,420.29c-9.79,63.72-25.95,139.15-36.59,186.32"/>
            <path strokeWidth="40" className="cls-1"
                  d="M548.45,348.67l42,56.56s-3.63,240.4-2.08,254.64,18.26,16.39,18.26,16.39H682.3c24.9,0,24.9-23.88,24.9-23.88s4.35-18,10.62-45.77"/>
            <line strokeWidth="40" x1="588.72" y1="402.87" x2="629.82" y2="456.11"/>
            <line  strokeWidth="40" x1="717.82" y1="606.61" x2="717.82" y2="606.61"/>
            <line  strokeWidth="40" x1="588.11" y1="606.61" x2="717.82" y2="606.61"/>
            <path strokeWidth="40" className="cls-1" d="M357.49,240.7l24.21,18.37a13,13,0,0,0,15.7,0l24.22-18.37"/>
            <path strokeWidth="40" className="cls-1" d="M476.86,241.1l24.22,18.36a13,13,0,0,0,15.7,0L541,241.1"/>
            <path strokeWidth="40" className="cls-1" d="M361.38,317l-24.21,18.37a13,13,0,0,1-15.7,0L297.25,317"/>
            <path strokeWidth="40" className="cls-1" d="M481.91,317,457.7,335.33a13,13,0,0,1-15.7,0L417.78,317"/>
            <line  strokeWidth="40" x1="325.08" y1="667.01" x2="325.08" y2="697.24"/>
            <line strokeWidth="40" x1="260.45" y1="667.14" x2="260.45" y2="697.37"/>
            <line strokeWidth="40" x1="389.71" y1="667.01" x2="389.71" y2="697.24"/>
            <line strokeWidth="40" x1="454.34" y1="666.98" x2="454.34" y2="697.22"/>
            <line strokeWidth="40"  x1="518.96" y1="667.01" x2="518.96" y2="697.24"/>
        </svg>

    );
}
export default Sweater;