import { useState } from "react"
import styled from "styled-components"
import * as Styled from "./style"

import { ActiveKitOverlay } from "@Utils/lookups/overlays"
import colors from "@Colors"
import { useChannelData } from "@Redux/slices/dashboard/selectors"
import H3 from "../../../H3"
import Overlay from "@Features/Overlays/ActiveKit"
import { SVG } from "@Components/shared"
import useDimensions from "@Hooks/useDimensions"

interface Props {
	overlay: any
}

const Preview = ({ overlay }: Props) => {
	const { urlSafeName, _id } = useChannelData()
	const [cursor, setCursor] = useState(0)
	const { observe, width } = useDimensions()

	const overlayOptions = Object.values(ActiveKitOverlay)

	const hasAKitSelected =
		Object.keys(overlay?.primaryKit || {}).length > 0 || Object.keys(overlay?.secondaryKit || {}).length > 0

	return (
		<>
			<H3>Preview</H3>
			<PreviewContainer ref={observe}>
				{cursor !== 0 && (
					<>
						<SVG.Arrow
							width="24px"
							onClick={() => setCursor((cursor) => (cursor === 0 ? cursor : cursor - 1))}
							style={{
								transform: "rotate(-90deg)",
								position: "absolute",
								top: "24px",
								left: "24px",
								cursor: "pointer"
							}}
						/>
					</>
				)}
				<H3 style={{ marginTop: 0, marginBottom: "24px" }}>{overlayOptions[cursor].style.toUpperCase()}</H3>
				{hasAKitSelected ? (
					<Overlay _id={_id} previewWidth={width} overlayStyle={overlayOptions[cursor].style as ActiveKitOverlays} />
				) : (
					<p>Choose a kit to see a preview.</p>
				)}
				<Styled.Paragraph style={{ marginTop: "24px" }}>
					Set your OBS browser source to {overlayOptions[cursor].width} x {overlayOptions[cursor].height} px.
				</Styled.Paragraph>
				{cursor < overlayOptions.length - 1 && (
					<>
						<SVG.Arrow
							width="24px"
							onClick={() => setCursor((cursor) => (cursor < overlayOptions.length - 1 ? cursor + 1 : cursor))}
							style={{
								transform: "rotate(90deg)",
								position: "absolute",
								top: "24px",
								right: "24px",
								cursor: "pointer"
							}}
						/>
					</>
				)}
			</PreviewContainer>
		</>
	)
}

export default Preview

// Styled Components

const PreviewContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	padding: 24px;
	border-radius: 12px;
	background-color: ${colors.dark20};
	overflow: hidden;
`
