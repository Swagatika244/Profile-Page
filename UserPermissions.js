import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
  getCameraRollPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status != 'granted'){
        alert("We need permission to access the library")
      }
    }
  };
}
export default new UserPermissions();