import React, { useEffect, useState } from 'react'

const ResizeHandles = (props) => {

    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [clickedElement, setClickedElement] = useState(null)

    const handleMouseDown = (e) => {
        setInitialPos({ x: e.clientX, y: e.clientY })
        setIsDragging(true)
        setClickedElement(e.target)
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                let offsetX = e.clientX - initialPos.x
                let offsetY = e.clientY - initialPos.y

                if (parseInt(offsetX) < 0) {
                    if (clickedElement.classList.contains("resizeLeft")) {
                        handles.parentElement.style.width = parseInt(handles.parentElement.offsetWidth) + Math.abs(parseInt(offsetX)) + "px";
                        handles.parentElement.style.left = parseInt(handles.parentElement.offsetLeft) - Math.abs(parseInt(offsetX)) + "px";
                    } else {
                        handles.parentElement.style.width = parseInt(handles.parentElement.offsetWidth) - Math.abs(parseInt(offsetX)) + "px";
                    }
                } else {
                    if (clickedElement.classList.contains("resizeLeft")) {
                        handles.parentElement.style.width = parseInt(handles.parentElement.offsetWidth) - Math.abs(parseInt(offsetX)) + "px";
                        handles.parentElement.style.left = parseInt(handles.parentElement.offsetLeft) + Math.abs(parseInt(offsetX)) + "px";
                    } else {
                        handles.parentElement.style.width = parseInt(handles.parentElement.offsetWidth) + Math.abs(parseInt(offsetX)) + "px";
                    }
                }
                setInitialPos({ x: e.clientX, y: e.clientY })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            setClickedElement(null)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [initialPos, isDragging])

    useEffect(() => {
        handles.parentElement.style.overflowWrap = "break-word";
        handles.parentElement.style.position = "absolute";
        handles.parentElement.parentElement.style.position = "relative";
    }, [])

    return (
        <div id='handles' className='absolute w-full h-full top-0'>
            <span className="resizeHandle resizeLeft absolute left-[-5px] cursor-ew-resize top-[40%] border-[2px] w-[8px] h-[8px] border-blue-600 bg-white rounded-full" draggable="false" onMouseDown={handleMouseDown}></span>
            <span className="resizeHandle resizeRight absolute right-[-5px] cursor-ew-resize top-[40%] border-[2px] w-[8px] h-[8px] border-blue-600 bg-white rounded-full" draggable="false" onMouseDown={handleMouseDown}></span>
        </div>
        // <span id="handles" className="resizeHandle resizeLeft absolute left-[-5px] cursor-ew-resize top-[40%] border-[2px] w-[8px] h-[8px] border-blue-600 bg-white rounded-full" draggable="false" onMouseDown={handleMouseDown}></span>
    )
}

export default ResizeHandles