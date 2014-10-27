import javafx.application.Application;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import rx.Observable;

public class RxJavafxHelloWorld extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) throws Exception {

        StringProperty name = new SimpleStringProperty();

        final Observable<String> observableName = Observable.create(subscriber -> name.addListener((observable, oldValue, newValue) -> subscriber.onNext(newValue)));

        observableName.subscribe(s -> System.out.println("Hello " + s + "!"));

        VBox root = new VBox();
        root.setSpacing(5);
        root.setPadding(new Insets(5));

        Label yourNameLabel = new Label("Your Name:");
        TextField yourNameField = new TextField();
        yourNameField.textProperty().bindBidirectional(name);

        root.getChildren().addAll(yourNameLabel, yourNameField);

        stage.setScene(new Scene(root));
        stage.show();
    }
}
