import React, { useState } from 'react'

export default function CreateGroup(props) {

    const [groupInfo, setgroupInfo] = useState({
        groupName: "",
        groupDescription: "",
        groupImage: ""
    })


    const handleChange = (e) => {
        // const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setgroupInfo(prevInfo => ({
            ...prevInfo,
            [e.target.name]:e.target.value
        }));
    };
    const compressImage = (base64Image, maxWidth = 800, maxHeight = 600) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = base64Image;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
      
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
      
            canvas.width = width;
            canvas.height = height;
      
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
      
            resolve(canvas.toDataURL('image/jpeg', 0.7)); // Adjust quality as needed
          };
        });
      };
      
      const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = async () => {
          const base64Image = reader.result;
          const compressedImage = await compressImage(base64Image);
          setgroupInfo((prevInfo) => ({ ...prevInfo, groupImage: compressedImage }));
        };
      
        reader.readAsDataURL(file);
      };

    return (
        <div className={`dropdown ${props.ShowCreateGroup ? 'dropdown-open' : ''}`}>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-70 p-5 mt-10 shadow">
                <label htmlFor="Group Name"><h2>Group Name</h2>
                    <input type="text" placeholder='Enter Text' name='groupName' className="input input-bordered w-full max-w-xs mb-3" value={groupInfo.groupName} onChange={handleChange} />
                </label>
                <label htmlFor="Group Discription">
                    <h2>Group Discription</h2>
                    <input type="text" placeholder="Enter Text" name='groupDescription' className="input input-bordered w-full max-w-xs mb-3" value={groupInfo.groupDescription} onChange={handleChange} />
                </label>
                <label className='mb-3'>Profile Picture
                    <input type="file" name="groupImage" className='file-input file-input-bordered cursor-pointer ' accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                </label>
                <div>
                    <button
                        className="btn btn-sm btn-primary py-1 px-6 mr-2 ml-2" style={{ width: "45%" }}
                        onClick={() => props.handleCreate(groupInfo)}
                    >Create Group</button>
                    <button
                        className="btn btn-sm btn-primary px-6"
                        onClick={props.handleCancle} style={{ width: "45%" }}
                    >Cancle</button>
                </div>
            </ul>
        </div>
    )
}
