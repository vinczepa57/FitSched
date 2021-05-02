import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Calendar from "./Calendar";
import TrainingSection from "./TrainingSection";

function App() {

    const sectionNames = ["Abs-Workout","Leg-Workout","Hiit-Workout","Chest-Workout","Arm-Workout","Back-Workout","Shoulder-Workout"]

    return (
        <div>
            <Header />
            <Calendar />
            {sectionNames.map( newSection => 
                <TrainingSection
                    key={newSection}  
                    name={newSection}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;