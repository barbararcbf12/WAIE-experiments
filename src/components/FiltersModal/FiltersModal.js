import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, TouchableOpacity, View, Alert, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const myIcon = (<Icon name="ios-options" size={30} color="#000" />)

class FiltersModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              {/* <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight> */}

                <View style={styles.filterContainer}  >
                    <TouchableOpacity  style={styles.filter} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                        {/* <Text> X </Text> */}
                        { myIcon }
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  <TouchableOpacity 
                      onPress={ () => this.props.onPress("All") } 
                      style={[styles.symptomBox, {backgroundColor: "#ccc"}]}
                  >
                      <Text style={styles.textBox}>All</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "All" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                      onPress={ () => this.props.onPress("Bowel Urgency")} 
                      style={[styles.symptomBox, {backgroundColor: "#ffb300"}]}
                  >
                      <Text style={styles.textBox}>Bowel Urgency</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Bowel Urgency" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Bloating")} 
                      style={[styles.symptomBox, {backgroundColor: "#99af72"}]}
                  >
                      <Text style={styles.textBox}>Bloating</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Bloating" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Constipation")} 
                      style={[styles.symptomBox, {backgroundColor: "#00ffff"}]}
                  >
                      <Text style={styles.textBox}>Constipation</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Constipation" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Craving")} 
                      style={[styles.symptomBox, {backgroundColor: "#ff00ff"}]}
                  >
                      <Text style={styles.textBox}>Craving</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Craving" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Diarrhea")} 
                      style={[styles.symptomBox, {backgroundColor: "#ffff00"}]}
                  >
                      <Text style={styles.textBox}>Diarrhea</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Diarrhea" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Frequent/Infrequent Bowel Moviments")} 
                      style={[styles.symptomBox, {backgroundColor: "#07a8a8"}]}
                  >
                      <Text style={styles.textBox}>Frequent/Infrequent Bowel Moviments</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Frequent/Infrequent Bowel Moviments" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Heartburn")} 
                      style={[styles.symptomBox, {backgroundColor: "#00ff00"}]}
                  >
                      <Text style={styles.textBox}>Heartburn</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Heartburn" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Nausea / Vomit")} 
                      style={[styles.symptomBox, {backgroundColor: "#bb8296"}]}
                  >
                      <Text style={styles.textBox}>Nausea / Vomit</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Nausea / Vomit" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

                  <TouchableOpacity 
                      onPress={() => this.props.onPress("Other")} 
                      style={[styles.symptomBox, {backgroundColor: "#4f8eef"}]}
                  >
                      <Text style={styles.textBox}>Other</Text>
                      <View style={styles.iconBox}>
                          { this.props.filter === "Other" ? myIcon : "" }
                      </View> 
                  </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>
        
        <View style={styles.filterContainer}  >
            <TouchableOpacity  style={styles.filter} onPress={() => this.setModalVisible(true)}>
                { myIcon }
            </TouchableOpacity>
            <Text>Filtered by: </Text>
        </View>
        {/* <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
        display: "flex",
        flexWrap: "wrap",
        width: Dimensions.get("window").width,
        height: 44,
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0
    },
    filterContainer: {
        display: "flex",
        // flexDirection: 'row',
        height: 44,
        width: 500,
        backgroundColor: "#ccc",
    },
    filter: {
        height: 40,
        width: 40,
        margin: 5,
        marginTop: 2,
        marginBottom: 2,
        padding: 5,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    symptominputBox:{
        height: 15
    },
    placholder: {
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "black",
        width: "80%",
        height: 150,
    },
    button: {
        margin: 8,
        marginTop: 10
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    map: {
        height: "1",
    },
    symptomBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "space-between",
        minWidth: 40,
        padding: 8,
        paddingRight: 20,
        margin: 5,
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 5,
        width: "85%",
        //backgroundColor: "#ffb300"
    },
    textBox: {
        width: "95%",
        fontSize: 12,
    },
    iconBox: { 
        marginLeft: 5, 
        marginTop: -10, 
        marginBottom: -15 
    }

});

export default FiltersModal;