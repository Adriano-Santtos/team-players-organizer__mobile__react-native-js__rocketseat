import AsyncStorage from "@react-native-async-storage/async-storage";

import {PLAYER_COLLECTION} from "@storage/storageConfig";
import {PlayersStorageDTO} from "@storage/players/PlayersStorageDTO";

export async function playersGetByGroup(group: string) {
    try {
        const stored = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: PlayersStorageDTO[] = stored ? JSON.parse(stored) : [];

        return players
    } catch (error) {
        throw error;
    }
}
