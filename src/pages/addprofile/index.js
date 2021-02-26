import React from "react";
import { connect } from "react-redux";
import { isEmptyObject, showAlert } from "src/utils/native";
import { View, Text, ScrollView, Image, TouchableOpacity, Keyboard } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import * as authActions from "src/redux/actions/authActions";
import * as createBabyAction from "src/redux/actions/createBabyAction";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
import { Images } from "src/assets/images";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "react-native-image-picker";
import Moment from "moment";
import styles from "./styles";

class AddProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBirthday: "",
			selectedHeight: "10",
			selectedWeight: "0",
			nameValue: "",
			babyprofile_id: "100",
			imageUrl: null,
			isDatePickerVisible: false,
			value: new Date(),
			avatarSource: "",
			validate: false
		};
	}

	static navigationOptions = ({ navigation, screenProps: { } }) => {
		return {
			title: null,
			headerTintColor: "white",
			headerStyle: {
				backgroundColor: "#fff",
				shadowOpacity: 0,
				elevation: 0,
				height: 50,
			},
			headerLeft: (
				<TouchableOpacity onPress={() => { navigation.pop(); }} style={styles.backButton}>
					<Image
						source={Images.Track.prevIcon}
						style={styles.backIcon}
					/>
					<Text style={styles.backText}>Back</Text>
				</TouchableOpacity>
			)
		};
	};

	logOutHandler() {
		const { dispatchResetAuthState } = this.props;
		dispatchResetAuthState();
	}

	cancelbuttonClicked() {
		const { navigation } = this.props;
		navigation.pop();
	}

	savebuttonClicked() {
		this.setState({ validate: true });
		const { avatarSource, nameValue, value, selectedHeight, selectedWeight, babyprofile_id } = this.state;
		const { dispatchCreateProfile, navigation } = this.props;


		if(!nameValue){
			return;
		}

		if(!avatarSource){
			showAlert("Error", "Please select baby image.", "", () => {})
			return;
		}

		let data = new FormData();
		if(avatarSource) {
			data.append("baby_profileupload", {
				name: avatarSource.fileName,
				type: avatarSource.type,
				uri: avatarSource.uri
			});
		}
		// if(avatarSource === null) {
		// 	data.append("baby_profileupload", null);
		// }
		data.append("name", nameValue);
		// data.append('babyprofile_id', babyprofile_id);
		data.append("birthday", value.toString());
		data.append("height", selectedHeight);
		data.append("weight", selectedWeight);

		// console.log(data);
		// return;
		dispatchCreateProfile(data, navigation);
	}

	showDatePicker() {
		console.log("A date has been picked: ");
		this.setState({ isDatePickerVisible: true });
		Keyboard.dismiss();
	}

	hideDatePicker(date) {
		this.setState({ isDatePickerVisible: false });
		this.setState({ value: Moment(date).format("MMM DD, YYYY") });
	}

	handleConfirm(date) {
		this.hideDatePicker();
		this.setState({ value: Moment(date).format("MMM DD, YYYY") });
	}

	selectPhotoTapped(data) {
		const options = {
			title: "Select file",
			mediaType: "photo",
		};
		ImagePicker.launchImageLibrary(options, (response) => {
		  console.log("Response = ", response);
		  if(response.didCancel) {
				console.log("User cancelled image picker");
		  } else {
				this.setState({ avatarSource: response, imageUrl: response.uri });
		  }
		});
	}

	render() {
		const { selectedBirthday, imageUrl, avatarSource, selectedHeight, selectedWeight, nameValue, isDatePickerVisible, value } = this.state;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<Text style={styles.editprofileTitle}>Add Baby Profile</Text>
					<View style={styles.editprofileForm}>
						<Menu>
							<MenuTrigger style={styles.MenuuserprofileIcon}>
								<View style={styles.userprofileIcon}>
									{imageUrl !== null ? (
										<Image
											source={{ uri: imageUrl }}
											style={{ width: 125, height: 125, borderRadius: 80, backgroundColor: "#ccc" }}
										/>
									  )
									  	: (
											<Image
											source={Images.eidtProfile.userprofileIcon}
											style={styles.userprofilebutton}
										/>
										)}
									<Image
										source={Images.eidtProfile.cameraIcon}
										style={styles.cameraIcon}
									/>
								</View>
							</MenuTrigger>
							<MenuOptions style={styles.menuOptionS} optionsContainerStyle={{ marginTop: 100, marginLeft: 55, maxWidth: 160, elevation: 10, }}>
								<MenuOption style={styles.menuOption}>
									<TouchableOpacity onPress={(data) => this.selectPhotoTapped(data)}>
										<View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
											<Text style={styles.menuOptionText}>Change Photo</Text>
										</View>
									</TouchableOpacity>
								</MenuOption>
								<MenuOption style={styles.menuOption}>
									<Text style={styles.menuOptionText} onPress={() => this.setState({ avatarSource: null, imageUrl: null })}>Remove</Text>
								</MenuOption>
							</MenuOptions>
						</Menu>

						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							onChangeText={(value) => {
								this.setState({ nameValue: value });
							}}
							textLabelBackground="white"
							placeholder="Name"
							value={nameValue}
							isInvalid={this.state.validate && !nameValue}
							errorMessage={(this.state.validate && !nameValue) ? "Enter baby name" : null}
						/>
						<View style={styles.pickerInputContainer}>
							<Text
								style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}
							>
								Birthday
							</Text>
							<View style={styles.picker}>
								<TouchableOpacity
									onPress={() => this.showDatePicker()}
									style={styles.pickerInput}
								>
									<Text style={styles.pickerInput}>
										{Moment(value).format("MMM DD, YYYY")}
									</Text>
								</TouchableOpacity>
								<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
								<DateTimePickerModal
									date={value ? new Date(value) : new Date()}
									isVisible={isDatePickerVisible}
									mode="date"
									onConfirm={(date) => this.handleConfirm(date)}
									onCancel={(date) => this.hideDatePicker(date)}
									maximumDate={new Date()}
								/>
							</View>
						</View>
						<View style={styles.pickerInputContainer}>
							<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Height</Text>
							<View style={styles.picker}>
								<RNPickerSelect
									onValueChange={(value) => {
										this.setState({ selectedHeight: value });
									}}
									value={selectedHeight}
									style={{
										inputIOS: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 12
										},
										inputAndroid: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 12
										}
									}}
									useNativeAndroidPickerStyle={false}
									Icon={() => <MaterialIcon style={styles.RNPickerIcon}>keyboard_arrow_down</MaterialIcon>}
									placeholder={{
										label: "Select Height",
										color: "#999999"
									}}
									items={[
										{ label: "10 inches", value: "10" },
										{ label: "10.5 inches", value: "10.5" },
										{ label: "11 inches", value: "11" },
										{ label: "11.5 inches", value: "11.5" },
										{ label: "12 inches", value: "12" },
										{ label: "12.5 inches", value: "12.5" },
										{ label: "13 inches", value: "13" },
										{ label: "13.5 inches", value: "13.5" },
									]}
								/>
							</View>
						</View>
						<View style={styles.pickerInputContainer}>
							<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Weight</Text>
							<View style={styles.picker}>
								<RNPickerSelect
									onValueChange={(value) => {
										this.setState({ selectedWeight: value });
									}}
									value={selectedWeight}
									style={{
										inputIOS: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 12
										},
										inputAndroid: {
											height: 60,
											width: "100%",
											color: "#000",
											fontSize: 20,
											lineHeight: 24,
											paddingHorizontal: 12
										}
									}}
									useNativeAndroidPickerStyle={false}
									Icon={() => <MaterialIcon style={styles.RNPickerIcon}>keyboard_arrow_down</MaterialIcon>}
									placeholder={{
										label: "Select Height",
										color: "#999999"
									}}
									items={[
										{ label: "0 lb 0 oz", value: "0" },
										{ label: "1 lb 1 oz", value: "1" },
										{ label: "2 lb 2 oz", value: "2" },
										{ label: "3 lb 3 oz", value: "3" },
										{ label: "4 lb 4 oz", value: "4" },
										{ label: "5 lb 5 oz", value: "5" },
										{ label: "6 lb 6 oz", value: "6" },
										{ label: "7 lb 7 oz", value: "7" },
									]}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
				<View style={styles.profilebottomButtons}>
					<View style={styles.profilebuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.cancelbuttonStyle}
							buttonText="Cancel"
							buttonClicked={() => this.cancelbuttonClicked()}
						/>
					</View>
					<View style={styles.profilebuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.savebuttonStyle}
							buttonTextStyle={styles.savebuttontextStyle}
							buttonText="Save"
							buttonClicked={() => this.savebuttonClicked()}
						/>
					</View>
				</View>
			</View>
		);
	}
}
const mapStateToProps = (state) => ({
	babyDetails: state.createBabyReducer
});

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState(),
	dispatchCreateProfile: (data, navigation) => createBabyAction.CreateProfiles(data, navigation)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProfileScreen);