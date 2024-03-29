import React, {useEffect, useState} from 'react';
import {Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import DaumPostcode from "react-daum-postcode";
import {HiLocationMarker} from "react-icons/hi";
import {LuAlertCircle} from "react-icons/lu";
import NextButton from "./NextButton";


const AddClubInputActivitiesArea = ({onNext, activitiesArea, setActivitiesArea}) => {

    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [selectedArea, setSelectedArea] = useState(activitiesArea);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        if (activitiesArea !== '') {
            setSelectedArea(activitiesArea);
            setIsNextDisabled(false);
        }
    }, [activitiesArea]);

    const complete = (data) => {
        // console.log("지역데이터 확인", data)
        setActivitiesArea(data.query + " " + data.sigungu);
        onOpenChange();
        setIsNextDisabled(false);
    }

    return (
        <>
            <span style={{fontSize: 20, fontWeight: 600}} className="mb-[10px]">주로 모임 지역은 어디인가요?</span>
            <br/><br/>

            <Input type='text' value={selectedArea} onClick={onOpen}
                   startContent={<HiLocationMarker style={styles.icon}/>}
                   placeholder="예시 : 강남구 신사동"
            />
            <br/>
            <div style={styles.description}>
            <LuAlertCircle style={{marginLeft:5, marginRight:5, float:'left'}}/>
            <span className="text-tiny">주소를 선택하면 지역이 등록됩니다.</span>
            </div>

            <br/>
            <Modal
                isOpen={isOpen}
                placement='bottom-center'
                onOpenChange={onOpenChange}
                className="max-w"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">지역 조회</ModalHeader>
                    <ModalBody>
                        <DaumPostcode
                            autoClose
                            onComplete={complete}
                            submitMode='false'
                            useBannerLink='false'
                            hideMapBtn='true'
                            hideEngBtn='true'
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <NextButton isNextDisabled={isNextDisabled} onNext={onNext}/>

        </>
    );
};

export default AddClubInputActivitiesArea;

const styles = {
    description :{
        display : 'flex',
        justifyContent : 'left',
        color:'gray',
    },
    icon : {
        width:24,
        height:24,
    }
}



