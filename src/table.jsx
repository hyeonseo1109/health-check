export const BpTable = () => (
    <table className="border text-[15px] shadow-[0_0_10px_#aebce1]">
        <thead>
            <tr className="bg-[#b6c5ee]">
                <th className="border">(단위: mmHg)</th>
                <th className="border">수축기 혈압</th>
                <th className="border">이완기 혈압</th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-[#ffffff9d]">
                <td className="border">정상</td>
                <td className="border">120 이하</td>
                <td className="border">80 이하</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">고혈압 전단계</td>
                <td className="border">121~139</td>
                <td className="border">80~89</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">고혈압 1기</td>
                <td className="border">140~159</td>
                <td className="border">90~99</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">고혈압 2기</td>
                <td className="border">160 이상</td>
                <td className="border">100 이상</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">저혈압</td>
                <td className="border">90 이하</td>
                <td className="border">60 이하</td>
            </tr>
        </tbody>
    </table>



)


export const BstTable = () => (
    <table className="border text-[15px] shadow-[0_0_10px_#aebce1]">
        <thead>
            <tr className="bg-[#b6c5ee]">
                <th className="border">(단위: mg/dl)</th>
                <th className="border">공복 혈당</th>
                <th className="border">식후 2시간</th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-[#ffffff9d]">
                <td className="border">정상</td>
                <td className="border">100 미만</td>
                <td className="border">140 미만</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">당뇨 전단계</td>
                <td className="border">100~125</td>
                <td className="border">140~199</td>
            </tr>
            <tr className="bg-[#ffffff9d]">
                <td className="border">당뇨</td>
                <td className="border">126 이상</td>
                <td className="border">200 이상</td>
            </tr>
        </tbody>
    </table>



)


export const BwTable = () => (
    <table className="border text-[15px] shadow-[0_0_10px_#aebce1]">
        <thead>
            <tr className="bg-[#b6c5ee]">
                <th className="border">(단위: kg/m²)</th>
                <th className="border">저체중</th>
                <th className="border">정상</th>
                <th className="border">경도 비만</th>
                <th className="border">중증도 비만</th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-[#ffffff9d]">
                <td className="border">BMI 지수</td>
                <td className="border">18.5 미만</td>
                <td className="border">18.5~23</td>
                <td className="border">23~30</td>
                <td className="border">30 이상</td>
            </tr>
        </tbody>
    </table>



)