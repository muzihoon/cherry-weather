import React, {useEffect, useRef, useState} from 'react';
import {Image, Input, Textarea} from "@nextui-org/react";
import {TbPhoto} from "react-icons/tb";
import {FaHashtag} from "react-icons/fa6";
import {v4 as uuidv4} from 'uuid';
import NextButton from "./NextButton";
import defaultImage from '../../../assets/images/defalut/club_profile.jpg'

const AddClubSettingDetails = ({onNext, description, file, setCode, setDescription, onFileSelect, tag, setTag}) => {

    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [preview, setPreview] = useState();
    const [fileSelected, setFileSelected] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            setFileSelected(true);
        } else {
            setPreview(defaultImage);
        }
    }, [file]);

    useEffect(() => {
      setIsNextDisabled(description.length < 2);
    }, [description]);


    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const shortUUID = generateShortUUID()
            const extension = getFileExtension(file.name);
            const newFileName = 'cf-'+ shortUUID + '.jpg'; //+ extension; // 새로운 파일 이름
            const modifiedFile = new File([file], newFileName, { type: file.type });

            setCode('cf-'+ shortUUID);
            onFileSelect(modifiedFile);
        }
    };

    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    }

    const generateShortUUID = () => {
        const uuid = uuidv4();
        const uuidWithoutHyphen = uuid.replace(/-/g, '');
        return uuidWithoutHyphen.substring(0, 7);
    }

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        setIsNextDisabled(newDescription.length < 10);
    };

    const handleTagChange = (e) => {
        const newTag = e.target.value;
        setTag(newTag);
    };

    return (
        <>
            <span style={{fontSize: 20, fontWeight: 600}} className="mb-[10px]"> 어떤 클럽인가요?</span>
            <br/><br/>

            <input
                name="file"
                type="file"
                style={{display: "none"}}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <br/>

            <div onClick={handleClick}>
                {
                    fileSelected ? null : (
                        <div className="absolute z-10 w-full h-[300px] from-slate-800 bg-gradient-to-b to-transparent"
                             style={styles.imgBlock}>
                            <TbPhoto style={styles.icon}/>
                            <span style={styles.description}>클럽 소개 사진을 넣어주세요</span>
                        </div>
                    )
                }

                <Image
                    removeWrapper
                    alt="clubProfilePicture"
                    className="z-0 w-full object-cover h-[300px] object-middle"
                    src={preview}
                    style={{border: '2px solid #E4E4E7', cursor: 'pointer'}}
                />
            </div>

            <br/>

            <Textarea type="text" variant='bordered' radius='lg' placeholder="클럽을 소개해주세요 (10자 이상)"
                      size='lg'
                      value={description} onChange={handleDescriptionChange}/>
            <br/>

            <Input type='text' startContent={<FaHashtag style={{color: 'gray'}}/>}
                   variant='bordered' radius='lg' value={tag} onChange={handleTagChange} placeholder="예: 자전거, 공원, 산책"/>

            <br/><br/><br/><br/>

            <NextButton isNextDisabled={isNextDisabled} onNext={onNext}/>
        </>
    );
};

export default AddClubSettingDetails;

const styles = {
    imgBlock   : {
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        flexWrap      : 'wrap',
        borderRadius  : 20,
    },
    description: {
        color     : 'white',
        fontSize  : 20,
        fontWeight: 400,
    },
    icon       : {
        color      : 'white',
        width      : 24,
        height     : 24,
        marginRight: 10,
    }
}

