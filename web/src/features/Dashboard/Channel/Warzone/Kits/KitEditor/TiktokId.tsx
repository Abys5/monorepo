import * as Styled from "./style"
import colors from "@Colors"
import TextInput from "@Components/shared/TextInput"
import { useDispatch } from "@Redux/store"
import { updateTiktokId } from "@Redux/slices/dashboard"
import { useActiveKit } from "@Redux/slices/dashboard/selectors"

const TiktokId = ({ ...props }) => {
	const dispatch = useDispatch()
	const {
		userData: { tiktokId }
	} = useActiveKit()

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.includes("vm.tiktok.com")) return dispatch(updateTiktokId(""))

		if (e.target.value.includes("/video/")) {
			const trimFront = e.target.value.split("/video/")
			const trimBack = trimFront[1].split("?is_copy_url")

			return dispatch(updateTiktokId(trimBack[0]))
		}

		return dispatch(updateTiktokId(e.target.value))
	}

	return (
		<Styled.Container>
			<Styled.HorizFlex>
				<Styled.Header>TIKTOK EMBED</Styled.Header>
				<Styled.HeaderHelper>Optional</Styled.HeaderHelper>
			</Styled.HorizFlex>
			<Styled.ParagraphHelper>
				Enter the link to your tiktok below. We HIGHLY recommend that the video be about either this kit specifically or
				a general "loadouts" video.
			</Styled.ParagraphHelper>
			<TextInput
				type="text"
				name="tiktokVideoId"
				label={"https://www.tiktok.com/"}
				labelStyles={{ color: colors.lighter, display: "block", marginTop: "12px", textTransform: "initial" }}
				value={tiktokId || ""}
				subline={`If you want to just copy-paste the whole Tiktok link, we'll trim it for you. We know, we know, you're welcome. (Note that we cannot accept links from the mobile app. If it starts with "vm.tiktok.com", it won't work!)`}
				onChange={(e) => handleInput(e)}
				inputStyles={{ marginLeft: "0", marginTop: "0" }}
				sublineStyles={{ color: colors.lighter, fontWeight: "initial", letterSpacing: "1px" }}
			/>
		</Styled.Container>
	)
}

export default TiktokId
