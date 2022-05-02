import { environment } from "../environment/environment";
import * as SecureStore from 'expo-secure-store';

export class UserService {
  private token: string;
  public async updateTokenInDatabase() {
    console.log("update token "+await SecureStore.getItemAsync('jwt'));
    const url = environment['host'] + "api/user/post/updateToken";
    if (this.token != null) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(await SecureStore.getItemAsync('jwt'))
        });
        let responseJSON = await response.json();
        if (responseJSON['status'] == 'valid') {
          console.log('valid');
        }
        else {
          console.log(responseJSON['error']);
        }
        console.log('Token updated successfully');
      }
      catch (e) {
        console.log('Error to update token ' + e);
      }
    }
  }
}