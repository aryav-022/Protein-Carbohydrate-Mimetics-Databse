"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigDown, MinusCircle, PlusCircle } from "lucide-react";
import Image, { ImageProps } from "next/image";
import type { FC } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import type { OverlayRenderProps } from "react-photo-view/dist/types";

interface ImagePreviewerProps extends ImageProps {
	src: string;
}

const ImagePreviewer: FC<ImagePreviewerProps> = (props) => {
	return (
		<PhotoProvider toolbarRender={ToolbarRenderer}>
			<p className='text-sm text-center text-secondary my-4'>
				click image to interact <ArrowBigDown size={16} className='inline' />
			</p>

			<PhotoView src={props.src}>
				<Image {...props} className={cn("cursor-pointer", props.className)} id='step2' />
			</PhotoView>
		</PhotoProvider>
	);
};

const ToolbarRenderer: FC<OverlayRenderProps> = ({ onScale, scale }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<PlusCircle
						className='cursor-pointer text-secondary mx-2'
						onClick={() => onScale(scale + 1)}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom In</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger>
					<MinusCircle
						className='cursor-pointer text-secondary mx-2'
						onClick={() => onScale(scale - 1)}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom Out</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ImagePreviewer;
